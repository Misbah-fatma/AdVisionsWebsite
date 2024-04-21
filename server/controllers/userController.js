const UserModel=require('../model/UserModel')

module.exports.getStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await UserModel.find({role:"Student"})
        return res.status(200).json({
            studentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.getTeacher__controller=async (req,res,next)=>{
    try {
        const teacherInfo=await UserModel.find({role:"Teacher"})
        return res.status(200).json({
            teacherInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.deleteTeacher__controller = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      return res.status(200).json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong6",
      });
    }
  };

  module.exports.avatar = async (req, res, next) => {
    try {
      const { courseDescription, courseName, courseLink, coursePrice } = req.body;
  
      if (!courseDescription || !courseName ) {
        return res.status(400).json({
          error: "Please Provide All Information",
        });
      }
  
  
      const course = new UserModel({
           avatar
      
  
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