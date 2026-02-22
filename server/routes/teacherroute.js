const express = require("express");
const { create, getteachername, updateteacher, deleteteacher, getallteachers, getme, Assgign } = require("../controller/teachercontroller");
const isauth = require("../middleware/isauth");
const router = express.Router();

router.route("/create").post(isauth,Assgign);
router.route("/get").get(isauth,getteachername);
router.route("/getall").get(isauth,getallteachers);
router.route("/update/:id").put(updateteacher);
router.route("/delete/:id").delete(deleteteacher);
router.route("/getme/:id").get(getme);



module.exports = router;