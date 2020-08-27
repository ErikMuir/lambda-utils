"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PrimitiveKeyValuePair = _interopRequireDefault(require("./PrimitiveKeyValuePair"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Header extends _PrimitiveKeyValuePair.default {
  constructor(key, value) {
    super(key, value);
  }

}

exports.default = Header;
//# sourceMappingURL=Header.js.map