const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },

    courseThumbnail: {
      type: String,
     
    },

    courseLink :{
      type: String,
      required: true,
    },
    coursePrice : {
      type: Number,
      required: true,
    },

    coursePdf: {
      type: String,
      required: true,
    },

    createdAt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role:{
      type: String,
      default: "Student"
  },
  
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;