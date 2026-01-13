const express = require("express");
const router = express.Router();

// Import controllers

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/courseProgress");

// Import middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// Course routes

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Category routes (admin only)

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// Rating & review routes

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
