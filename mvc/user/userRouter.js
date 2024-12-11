const express = require("express");
const {
  registerUser,
  authUser,
  allUser,
  updateUser,
  forgetPass,
} = require("./userController");
const uploadMulter = require("../../middlewares/mediaUpload");
const { protect, protectAdmin } = require("../../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    uploadMulter.fields([
      {
        name: "file",
        maxCount: 1,
      },
    ]),
    registerUser
  )
  .patch(
    [
      protect,
      uploadMulter.fields([
        {
          name: "file",
          maxCount: 1,
        },
      ]),
    ],
    updateUser
  );
router.post("/login", authUser);

module.exports = router;
