"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorVariable = exports.getRgbaColor = void 0;
var getRgbaColor = function (r, g, b, a) {
    return "rgba(" + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ", " + a + ")";
};
exports.getRgbaColor = getRgbaColor;
var getColorVariable = function (prefix, color) {
    return prefix + ": " + color;
};
exports.getColorVariable = getColorVariable;
