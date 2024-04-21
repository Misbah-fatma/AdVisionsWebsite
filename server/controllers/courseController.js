const CourseModel = require("../model/CourseModel");
const cloudinary=require('../middlewares/cloudinary')

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const studentInfo=await CourseModel.find({role:"Student"})
    const { courseDescription, courseName, courseLink, coursePrice } = req.body;

    if (!courseDescription || !courseName ) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    // const picUrls = await Promise.all(req.files.map(async (file) => {
    //   const pic = await cloudinary.uploader.upload(file.path);
    //   return pic.secure_url;
    // }));
    // const coursePdf = picUrls.join(',');

    const imgFiles = req.files['img']; // Get the thumbnail image file
const pdfFiles = req.files['pdf']; // Get the PDF files

// Handle the thumbnail image upload
const imgUrls = await Promise.all(imgFiles.map(async (file) => {
  const pic = await cloudinary.uploader.upload(file.path);
  return pic.secure_url;
}));

//Handle the PDF files upload
const pdfUrls = await Promise.all(pdfFiles.map(async (file) => {
  const pdf = await cloudinary.uploader.upload(file.path);
  return pdf.secure_url;
}));

const courseThumbnail = imgUrls[0]; // Assuming only one thumbnail image is uploaded
const coursePdf = pdfUrls.join(',');

    //const url = req.protocol + "://" + req.get("host");

    const course = new CourseModel({
      courseDescription,     
      courseName,
      courseThumbnail: courseThumbnail,
      courseLink,
      coursePrice,
      coursePdf : coursePdf
    

    });
    course
      .save()
      .then((result) => {
        console.log(result)
        return res.status(200).json({
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong1",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong2",
    });
  }
};


module.exports.getCourses__controller = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().populate(
      "createdAt",
      "role _id userName email"
    );
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong3",
    });
  }
};

module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    console.log(courseId);
    const course = await CourseModel.findOne({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong4",
    });
  }
};

module.exports.deleteCourse__Controller = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    console.log(courseId)
    const course = await CourseModel.findOneAndDelete({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong5",
    });
  }
};

module.exports.getAllData = async (req, res) => {
  try {
      const allData = await CourseModel.find();
      if (!allData || allData.length === 0) {
          return res.status(400).json({
              success: false,
              message: "No data found"
          })
      }
      return res.status(200).json({
          success: true,
          message: "All data",
          data: allData
      })
  } catch (e) {
      return res.status(500).json({
          success: false,
          message: "Internal Server Error11",
      })
  }
}

module.exports.getItems__controller = async (req, res, next) => {
  try {
    const allData = await CourseModel.find();
    if (!allData || allData.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No data found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "All data",
        data: allData
    })
} catch (e) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error1",
    })
}
};
