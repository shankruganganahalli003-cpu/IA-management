const express = require("express");
const { create, getall, updatesubject, deletesubject } = require("../controller/subjectcontroller");
const router = express.Router();


router.route("/create").post(create);
router.route("/getall").get(getall);
router.route("/update/:id").put(updatesubject);
router.route("/delete/:id").delete(deletesubject);



module.exports = router;