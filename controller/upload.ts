import P2PSocket from "udp-messaging";
import { upload } from "../config.json";
import { readFilePromise, processFilename } from "./file";

export declare class P2PSocket {
  constructor(port);
  bind: () => Promise<any>;
  sendMessage: (data: Buffer, address: string, port: number) => Promise<Buffer>;
  on: (
    event: string | symbol,
    callback: (data: Buffer, address: string, port: number) => {}
  ) => void;
  close: () => void;
}

export const init = async () => {
  const { host, localPort, remotePort } = upload;
  const p2p = new P2PSocket({ port: upload.localPort });
  await p2p.bind();

  //   const file = readFileSync("./img_1.jpg");
  //   p2p.sendMessage(file, "127.0.0.1", 10000).then(d => console.log("!"));

  // The Socket is an EventEmitter.
  p2p.on("message", async (data, address, port) => {
    console.log(`%s:%d says: %o`, address, port, data.toString());
  });

  // Execute holepunching (get an address and port that another peer over the internet can use to reach this peer)
  // const hole = await p2p.discoverSelf();
  return {
    sendImage: async path => {
      const file = await readFilePromise(path);
      await p2p.sendMessage(
        Buffer.from(
          JSON.stringify({
            filename: processFilename(path),
            buffer: file
          })
        ),
        host,
        remotePort
      );
    },
    close: p2p.close
  };
};
