#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("./components/api"));
var color_parser_1 = __importDefault(require("./components/color-parser/color-parser"));
var fs_1 = __importDefault(require("./components/fs"));
var process = __importStar(require("process"));
var commander_1 = require("commander");
commander_1.program
    .option('-f, --file <type>', 'figma file key')
    .option('-n, --node <type>', 'figma node id')
    .option('-t, --token <type>', 'figma access token')
    .option('-p, --preprocessor <type>', 'css preprocessor output type')
    .parse(process.argv);
if (process.argv.length < 9) {
    commander_1.program.outputHelp();
}
else {
    var file = commander_1.program.file, node = commander_1.program.node, token = commander_1.program.token, preprocessor = commander_1.program.preprocessor;
    var figmaApi = new api_1.default(file, node, token);
    var fs_2 = new fs_1.default('colors', preprocessor);
    figmaApi.getPageNodes().then(function (data) {
        var colorsOutput = new color_parser_1.default(data).parseColors();
        fs_2.writeFile(colorsOutput);
    });
}
