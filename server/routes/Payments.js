const express = require("express");
const router = express.Router();

const { purchaseCourse } = require("../controllers/payments");
const { auth, isStudent } = require("../middlewares/auth");

// Buy / Enroll course (mock payment)
router.post("/purchase-course", auth, isStudent, purchaseCourse);

module.exports = router;
