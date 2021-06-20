const express = require("express");
const router = express.Router();
// 加密
const bcrypt = require("bcrypt");

// 內建 驗證表單
const { body, validationResult } = require("express-validator");

// 自建 資料庫連線
const connection = require("../utils/db");

// 自訂驗證規則
const registerRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

const path = require("path");
const multer = require("multer");

// 設定上傳檔案的儲存位置
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // routes/auth.js -> 現在的位置
    // public/uploads -> 希望找到的位置
    // /routes/../public/uploads
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // 抓出副檔名
    const ext = file.originalname.split(".").pop();
    // 組合出自己想要的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// 做上傳工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    // console.log(file);
    //if (file.mimetype !== "image/jpeg") {
    //  return cb(new Error("不合法的 file type"), false);
    //}
    // file.originalname: Name of the file on the user's computer
    // 101.jpeg
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("是不合格的副檔名"));
    }
    // 檔案ＯＫ, 接受這個檔案
    cb(null, true);
  },
  limits: {
    // 限制檔案的上限 1M
    fileSize: 1024 * 1024,
  },
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    console.log("註冊表單資料: ", req.body);

    // 取得驗證結果
    const validateResult = validationResult(req);
    console.log("資料驗證結果: ", validateResult);

    // 錯誤處理
    if (!validateResult.isEmpty()) {
      // 回傳的錯誤資料不是空的代表發生錯誤
      return next(new Error("發生註冊錯誤"));
    }

    // 重複註冊
    let exist = await connection.queryAsync(
      "SELECT * FROM members WHERE name = ?",
      req.body.name
    );

    if (exist.length > 0) {
      return next(new Error("已經註冊過了"));
    }

    // 存進資料庫
    await connection.queryAsync(
      "INSERT INTO members (email, password, name) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
        ],
      ]
    );
    res.send("POST，收到表單資料!");
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// 定登入規則

router.post("/login", async (req, res, next) => {
  // 驗證有沒有這筆資料
  // 找資料庫裡的資料
  // 用內建函式 compare() 比對 前面為加密前 後面是加密後

  let exist = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );

  if (exist.length == 0) next(new Error("無此帳號"));

  res.send("yeahhhhh");
});

module.exports = router;
