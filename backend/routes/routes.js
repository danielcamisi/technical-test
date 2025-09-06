const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const newsController = require("../controllers/newsController");
const upload = require("../config/multer");
const validationToken = require("../middlewares/validation")

//USER methods

router.post("/users/SignIn", userController.SignIn);

router.post("/users/LogIn", userController.login);

//NEWS methods

router.post("/news/create", upload.single("img"), validationToken, newsController.create);

router.put("/news/:id", upload.single("img"), validationToken, newsController.edit);

router.delete("/news/:id", validationToken, newsController.delete)

router.get("/news", newsController.searchAllNews);

router.get("/news/:id", newsController.getDetails)

module.exports = router;
