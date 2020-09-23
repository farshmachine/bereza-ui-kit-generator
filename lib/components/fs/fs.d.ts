export default class Fs {
    private fileName;
    private outputFolder;
    private fileExt;
    private startSign;
    private endSign;
    private rootPath;
    private srcPath;
    constructor(fileName: string, fileExt: string);
    private getStartSign;
    private getEndSign;
    createFolder(folderPath: string, folderName: string): string;
    writeFile(content: string[]): void;
}
