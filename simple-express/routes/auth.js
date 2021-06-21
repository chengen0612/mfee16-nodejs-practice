// built in
const express = require("express");
const router = express.Router();
const path = require("path"); // 路徑管理

// module
const { body, validationResult } = require("express-validator"); // 表單驗證
const bcrypt = require("bcrypt"); // 密碼加密
const multer = require("multer"); // 處理上傳檔案

// API
const connection = require("../utils/db");

// middleware
// 自訂驗證規則
const registerRules = [
  body("email").isEmail().withMessage("email 格式錯誤"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("密碼不可少於六位數")
    .isLength({ max: 10 })
    .withMessage("密碼不可高於十位數"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

const loginRules = [
  body("email").isEmail().withMessage("email 格式錯誤"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("密碼不可少於六位數")
    .isLength({ max: 10 })
    .withMessage("密碼不可高於十位數"),
];

// 設定上傳檔案的儲存路徑、檔名...
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // 抓出副檔名
    const ext = file.originalname.split(".").pop();
    // 組合出想要的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// 做上傳工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    // 檢查副檔名
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("這不是圖片"));
    }
    // 通過檢查
    cb(null, true);
  },
  limits: {
    // 限制檔案的上限 1M
    fileSize: 1048576,
  },
});

// router
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    // console.log("表單文字: ", req.body);
    // console.log("表單檔案: ", req.file);
    // console.log('dirname: ', __dirname);

    // express-validator 的驗證結果
    const validateResult = validationResult(req);
    console.log("欄位驗證結果: ", validateResult);

    // 用驗證結果做錯誤處理
    if (!validateResult.isEmpty()) {
      // 回傳的錯誤資料不是空的代表發生錯誤
      return next(new Error("註冊資料不符規定"));
    }

    // 重複註冊
    const exist = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );

    if (exist.length > 0) {
      return next(new Error("已經註冊過了"));
    }

    // 存進資料庫
    const imgPath = req.file ? "uploads/" + req.file.filename : null;
    console.log("輸入圖片路徑到資料庫: ", imgPath);

    await connection.queryAsync(
      "INSERT INTO members (email, password, name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
          imgPath,
        ],
      ]
    );

    res.send("Oh Yeah! Registration accepted!");
    console.log("註冊成功");
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", loginRules, async (req, res, next) => {
  const validateResult = validationResult(req);
  console.log("i am error: ", validateResult);
  if (validateResult.length > 0) return next(new Error("資料格式不符規定"));

  let userData = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );

  if (userData.length == 0) return next(new Error("查無此帳號"));

  // get the object
  userData = userData[0];

  // 比對加密前後的密碼
  const verification = await bcrypt.compare(
    req.body.password,
    userData.password
  );

  if (!verification) return next(new Error("密碼錯誤"));

  // 設置 session
  req.session.member = {
    email: userData.email,
    name: userData.name,
    photo: userData.photo || null,
  };

  // console.log('userData: ', userData);
  // console.log('req.session: ', req.session);

  res.redirect(303, "/");
});

router.get('/logout', (req, res) => {
  req.session.member = null;
  res.redirect(303, '/');
});

module.exports = router;