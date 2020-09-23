import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

let folders: Boolean = false;

export default class Fs {
  private fileName: string;
  private outputFolder: string;
  private fileExt: string;
  private startSign: string;
  private endSign: string;
  private rootPath: string;
  private srcPath: string;

  constructor(fileName: string, fileExt: string) {
    this.fileName = fileName.toLowerCase();
    this.outputFolder = fileExt;
    this.fileExt = fileExt.toLowerCase();
    this.startSign = this.getStartSign();
    this.endSign = this.getEndSign();
    this.rootPath = process.cwd();
    this.srcPath = '';

    if (!folders) {
      this.srcPath = this.createFolder(this.rootPath, 'src');
      this.createFolder(this.srcPath, this.outputFolder);
      folders = true;
    }
  }

  private getStartSign() {
    switch (this.fileExt) {
      case 'less':
        return '@';
      default:
        return '$';
    }
  }

  private getEndSign() {
    switch (this.fileExt) {
      case 'sass':
        return '';
      default:
        return ';';
    }
  }

  createFolder(folderPath: string, folderName: string): string {
    const newFolder = path.join(folderPath, folderName);
    fs.mkdir(newFolder, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log(`${folderName} folder already exists`);
        } else {
          throw err;
        }
      } else {
        console.log(`${folderName} folder has been created`);
      }
    });

    return newFolder;
  }

  writeFile(content: string[]) {
    const file = path.join(
      this.srcPath,
      `${this.outputFolder}`,
      `_${this.fileName}.${this.fileExt}`
    );

    fs.writeFileSync(file, '');

    if (content.length > 0) {
      content.forEach((element) => {
        fs.appendFileSync(
          file,
          `${this.startSign}${element}${this.endSign}` + os.EOL
        );
      });
    }
  }
}
