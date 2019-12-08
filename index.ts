import { extname } from "path";
import USBDetector from "./controller/usbDetect";
import { readdirRecursive, copy } from "./controller/file";
// import { init } from "./controller/upload";
import { fileTypes } from "./config.json";

(async () => {
  const usbDetector = new USBDetector();
  const files = new Set<string>();
  // const uploader = await init();

  usbDetector.on(USBDetector.INSERT, letter => {
    console.log(`Detected USB Disk Inserted: ${letter}`);
    readdirRecursive(`${letter}`, filePath => {
      if (fileTypes.includes(extname(filePath))) {
        files.add(filePath);
        copy(filePath);
        // uploader.sendImage(filePath);
      }
    });
  });
  usbDetector.on(USBDetector.REMOVE, data => {
    console.log(`Detected USB Disk Removed: ${data}`);
    console.log(files.keys());
  });

  usbDetector.listen();
})();
