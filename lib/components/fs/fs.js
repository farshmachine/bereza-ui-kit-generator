"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var path = __importStar(require("path"));
var process = __importStar(require("process"));
var folders = false;
var Fs = /** @class */ (function () {
    function Fs(fileName, fileExt) {
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
    Fs.prototype.getStartSign = function () {
        switch (this.fileExt) {
            case 'less':
                return '@';
            default:
                return '$';
        }
    };
    Fs.prototype.getEndSign = function () {
        switch (this.fileExt) {
            case 'sass':
                return '';
            default:
                return ';';
        }
    };
    Fs.prototype.createFolder = function (folderPath, folderName) {
        var newFolder = path.join(folderPath, folderName);
        fs.mkdir(newFolder, function (err) {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log(folderName + " folder already exists");
                }
                else {
                    throw err;
                }
            }
            else {
                console.log(folderName + " folder has been created");
            }
        });
        return newFolder;
    };
    Fs.prototype.writeFile = function (content) {
        var _this = this;
        var file = path.join(this.srcPath, "" + this.outputFolder, "_" + this.fileName + "." + this.fileExt);
        fs.writeFileSync(file, '');
        if (content.length > 0) {
            content.forEach(function (element) {
                fs.appendFileSync(file, "" + _this.startSign + element + _this.endSign + os.EOL);
            });
        }
    };
    return Fs;
}());
exports.default = Fs;
