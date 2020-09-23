"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __importDefault(require("../parser"));
var utils_1 = require("../../utils");
var ColorParser = /** @class */ (function (_super) {
    __extends(ColorParser, _super);
    function ColorParser(page) {
        return _super.call(this, page) || this;
    }
    ColorParser.prototype.parseColors = function () {
        var _this = this;
        var palettes = [
            'Monochromes',
            'Primary',
            'Accent',
            'Faded',
            'Success',
            'Warning',
            'Danger',
        ].map(function (palette) {
            return _this.getColor(palette);
        });
        palettes.forEach(function (_a) {
            var name = _a.name, colors = _a.colors;
            var colorName = name.toLowerCase();
            colors.forEach(function (color) {
                var colorVariable = _this.getBgColor(name, colorName, color);
                _this.output.push(colorVariable);
            });
        });
        return this.output;
    };
    ColorParser.prototype.getColor = function (name) {
        var frameChildren = this.frames['Colors'].children;
        var paletteGroupChilds = frameChildren.find(function (child) {
            return ~child.name.indexOf(name) && child.type === 'GROUP';
        }).children;
        var paletteInstanceChilds = paletteGroupChilds.find(function (child) { return ~child.name.indexOf(name) && child.type === 'INSTANCE'; }).children;
        var colors = paletteInstanceChilds.filter(function (child) { return child.type === 'INSTANCE'; });
        return { name: name, colors: colors };
    };
    ColorParser.prototype.getBgColor = function (name, colorName, color) {
        var variableName = '';
        // ! Проверка из-за разрици именований в фигме объектов, отвечающих за цвет фона элемента
        if (name !== 'Monochromes') {
            var nameAfix = color.name.split(' ').slice(1).join('-');
            variableName = colorName + "-" + nameAfix;
        }
        else {
            variableName = color.name.toLowerCase().split(' ').join('-');
        }
        var rectElem = color.children.find(function (child) { return ~child.name.indexOf('color') && child.type === 'VECTOR'; });
        var _a = rectElem.fills[0].color, r = _a.r, g = _a.g, b = _a.b;
        var opacity = rectElem.fills[0].opacity
            ? +rectElem.fills[0].opacity.toFixed(1)
            : 1;
        var rgba = utils_1.getRgbaColor(r, g, b, opacity);
        return utils_1.getColorVariable(variableName, rgba);
    };
    return ColorParser;
}(parser_1.default));
exports.default = ColorParser;
