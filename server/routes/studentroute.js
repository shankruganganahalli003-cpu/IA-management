const express = require("express");
const { create, getallstudents, updatestudent, deletestudent, getme } = require("../controller/studentcontroller");
const isauth = require("../middleware/isauth");
const router = express.Router();


router.route("/create").post(isauth ,create);
router.route("/getall").get(isauth,getallstudents);
router.route("/update/:id").put(isauth,updatestudent);
router.route("/delete/:id").delete(isauth,deletestudent);
router.route("/getme/:id").get(getme);


module.exports = router;