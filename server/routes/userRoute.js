const {
  getStudent__controller,
  getTeacher__controller,
  deleteTeacher__controller,
  avatar
} = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get(
  "/student",
  requireLogin,
  adminAuthentication,
  getStudent__controller
);

router.post(
  "/post-course",
  (req, res, next) => {
    // Multer middleware
    upload.fields([
      { name: 'img', maxCount: 1 },
      { name: 'pdf', maxCount: 3 }
    ])(req, res, function (err) {
      if (err) {
        // Multer error
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload error' });
      }
      // No Multer error, proceed to next middleware
      next();
    });
  },
  avatar
);

router.get(
  "/teacher",
  requireLogin,
  adminAuthentication,
  getTeacher__controller
); 

router.get(
  "/delete-teacher",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);

module.exports = router;
