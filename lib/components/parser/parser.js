"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser(page) {
        this.frames = {};
        this.output = [];
        this.page = page;
        this.pageTypes = [];
        this.getNodeTypes();
    }
    Parser.prototype.getNodeTypes = function () {
        var types = [];
        var _loop_1 = function (_, value) {
            var node = value.document;
            var name_1 = node.name;
            this_1.pageTypes.push(name_1);
            this_1.frames[name_1] = node.children.find(function (child) { return ~child.name.indexOf(name_1) && child.type === 'FRAME'; });
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(this.page.nodes); _i < _a.length; _i++) {
            var _b = _a[_i], _ = _b[0], value = _b[1];
            _loop_1(_, value);
        }
        return types;
    };
    return Parser;
}());
exports.default = Parser;
