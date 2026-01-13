const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const {
  courseEnrollmentEmail,
} = require("../mail/template/courseEnrollmentEmail");
const mailSender = require("../utils/mailSender");
exports.purchaseCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    const existingProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true }
    );

    const courseData = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId: userId,
      completedVideos: [],
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { courseProgress: courseProgress._id } },
      { new: true }
    );
    await mailSender(
      user.email,
      "Course Enrollment Successful | SkillForge",
      courseEnrollmentEmail(courseData.courseName, user.firstName)
    );

    return res.status(200).json({
      success: true,
      message: "Course purchased and progress initialized",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
