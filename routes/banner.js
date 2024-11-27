const express = require('express');
const router = express.Router();
const { findBannnerService, updateBannnerService } = require("../service/bannerService");

// 获取首页标语
router.get('/', async function (req, res, next) {
  res.send(await findBannnerService())
});

// 设置首页标语
router.post('/', async function (req, res, next) {
    res.send(await updateBannnerService(req.body))
});


module.exports = router;