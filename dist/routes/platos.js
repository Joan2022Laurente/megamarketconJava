"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _platos = require("../controllers/platos");
var router = (0, _express.Router)();
router.get("/platos", _platos.getPlatos);
router.get("/platos/count", _platos.getPlatosCount);
router.get("/platos/:id", _platos.getPlato);
router.post("/platos", _platos.savePlato);
router["delete"]("/platos/:id", _platos.eliminarPlato);
router.put("/platos/:id", _platos.editarPlato);
var _default = router;
exports["default"] = _default;