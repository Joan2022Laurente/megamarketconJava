"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
console.log(process.env.NICKNAME);
var config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant"
};
exports.config = config;