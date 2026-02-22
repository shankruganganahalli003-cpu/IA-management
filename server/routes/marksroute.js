const express = require("express");
const { create, getbyparams, getall, updateIA, deleteIA, getme } = require("../controller/markscontroller");
const router = express.Router();

router.route("/create").post(create);
router.route("/getme/:uucmsNo/:department/:semester").get(getbyparams);
router.route("/getall").get(getall);
router.route("/update/:id").put(updateIA);;
router.route("/delete/:id").delete(deleteIA);;
router.route("/getme/:id").get(getme);




module.exports = router;