import { writeFileSync } from "fs";
import P2PSocket from "udp-messaging";
import { mkdir } from "./controller/file";
import { upload } from "./config.json";
import { join, resolve } from "path";

(async () => {
  mkdir(upload.saveDir);
  const p2p = new P2PSocket({ port: upload.remotePort });
  await p2p.bind();

  p2p.on("message", async (data, address, port) => {
    const { filename, buffer } = JSON.parse(data);
    console.log(
      `Message from %s:%d - %o`,
      address,
      port,
      filename ? filename : data
    );
    p2p.sendMessage(Buffer.from("recieved"), address, port);
    writeFileSync(join(resolve(upload.saveDir), filename), Buffer.from(buffer));
  });
  console.log(`server start at port ${upload.remotePort}`);
  // let hole = await p2p.discoverSelf();
  // p2p.close();
})();
