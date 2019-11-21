import {
  readFile,
  readdirSync,
  statSync,
  copyFileSync,
  mkdirSync,
  existsSync
} from "fs";
import { resolve, join, dirname, basename, sep, normalize } from "path";
import { promisify } from "util";

import { destFolder } from "../config.json";

type RecursiveCallback = (filePath: string) => void;

export const readFilePromise = promisify(readFile);

export const readdirRecursive = (path: string, callback: RecursiveCallback) => {
  const pathAbs = resolve(path);
  try {
    const filenames = readdirSync(pathAbs);
    for (const filename of filenames) {
      const filePath = join(pathAbs, filename);
      const fileStat = statSync(filePath);
      if (fileStat.isFile()) {
        callback(filePath);
      }
      if (fileStat.isDirectory()) {
        readdirRecursive(filePath, callback);
      }
    }
  } catch (e) {
    throw e;
  }
};

export const processFilename = (filePath: string) =>
  `${dirname(filePath)
    .split(sep)
    .slice(1)
    .join("-")}-${basename(filePath)}`;

export const copy = (filePath: string) => {
  copyFileSync(filePath, join(normalize(destFolder), processFilename(filePath)));
};

export const mkdir = (path: string) => {
  const pathAbs = resolve(path);
  if (!existsSync(pathAbs)) {
    mkdirSync(pathAbs);
  }
};
