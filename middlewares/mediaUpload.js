// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split(".")[1];
//     const randomFileName = `${Math.floor(
//       Math.random() * 9000000 + 1000000
//     )}_img.${ext}`; // Combine random name and extension
//     cb(null, randomFileName);
//   },
// });

// const upload = multer({ storage });

// module.exports = {
//   upload,
// };

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv/config");
const multer = require("multer");

const creds = new aws.Credentials(
  process.env.S3_ACCESS_KEY,
  process.env.S3_SECRET_KEY
);

const s3 = new aws.S3({
  credentials: creds,
  region: "ap-south-1",
});

module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: "makemymatressbucket123",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
  limits: { fieldSize: 100 * 1920 * 1080 },
});
