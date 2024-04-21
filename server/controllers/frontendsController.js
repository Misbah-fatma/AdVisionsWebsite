const CourseModel = require("../model/frontendsModal");
const cloudinary=require('../middlewares/cloudinary')

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const pic=await cloudinary.uploader.upload(req.file.path)
    //console.log(pic.secure_url)

    //const url = req.protocol + "://" + req.get("host");

    const course = new CourseModel({
      name,
      description,
      pic: pic.secure_url,

    });
    course
      .save()
      .then((result) => {
        //console.log(result)
        return res.status(200).json({
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
