const {
    postCourse__controller,

  } = require("../controllers/frontendsController");

  const front = require('../model/frontendsModal');
  
  const { adminAuthentication } = require("../middlewares/authentication");
  const { requireLogin } = require("../middlewares/requireLogin");
  
  const router = require("express").Router();
  const upload = require("../middlewares/multer");
  
  router.post(
    "/post-front",

    upload.single("img"),
    postCourse__controller
  );

  module.exports = router;

  router.route('/').get((req, res) => {
    front.find()
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  