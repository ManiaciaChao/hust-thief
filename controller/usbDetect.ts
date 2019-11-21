import { EventEmitter } from "events";
import { shell, getUSBLetters } from "./powershell";
import { checkInterval } from "../config.json";
import { readdirRecursive } from "./file";

export default class USBDetector extends EventEmitter {
  private usbLetters = new Set<string>();
  private interval: NodeJS.Timeout;
  private checking = false;
  static INSERT = Symbol("insert");
  static REMOVE = Symbol("remove");

  constructor() {
    super();
  }
  listen() {
    this.check();
    this.interval = setInterval(
      () => !this.checking && this.check(),
      checkInterval * 1000
    );
  }
  unlisten() {
    clearInterval(this.interval);
    this.interval = {} as NodeJS.Timeout;
  }
  async check() {
    this.checking = true;
    const letters = await getUSBLetters();
    if (this.usbLetters.size && !letters.length) {
      this.emit(USBDetector.REMOVE, Array.from(this.usbLetters));
      this.usbLetters.clear();
    } else {
      for (const letter of letters) {
        if (!this.usbLetters.has(letter)) {
          this.usbLetters.add(letter);
          this.emit(USBDetector.INSERT, letter);
        }
      }
    }
    this.checking = false;
  }
}


