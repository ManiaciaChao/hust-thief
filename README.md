<h1 align="center">Welcome to hust-thief 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> a simple tool to obtain designated files from teachers' usb-drives. 

## About

This tool is a tribute to those teachers who NEVER share slides with their students. With this tool, you can secretly make duplication of specific types of files.

However, some files may contain teachers' privacy, and even contain **secret-related** information, which means the process of copying **could be agasinst laws**.

**Use at your own risk. Don't be evil.**

### 🏠 [Homepage](https://github.com/ManiaciaChao/hust-thief)

## Install

Node.js runtime is required, you can achieve it via [offical website](https://nodejs.org/).

Then, run:

```sh
yarn install
```

## Build

```sh
yarn build
```

## Usage

Edit `config.json`.

```json
  "checkInterval": 5, // interval between usb connection checks
  "destFolder": "E:\\Users\\EvilC\\Pictures\\Saved Pictures\\test", // better volume E or F 
  "fileTypes": [
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".tiff",
    ".tif",
    ".png",
    ".bmp",
    ".ppt",
    ".pptx",
    ".doc",
    ".docx",
    ".pdf"
  ]
```

Then, directly double-click to excute `run.vbs`, and `hust-thief` will run in background. 

Or run via terminal, which is not invisible to the teacher.

```sh
yarn run start
```

## Author

👤 **maniacata**

* Website: http://blog.plus1sec.cn
* Github: [@ManiaciaChao](https://github.com/ManiaciaChao)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_