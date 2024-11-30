const express = require('express');
const { uploading, formatResponse } = require('../utils/tool');
const multer = require('multer');
const { UploadError } = require('../utils/errors');
const router = express.Router();

// 上传文件
router.post('/', async function (req, res, next) {
    // singe 方法里面写上传控件的name值
    uploading.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            next(new UploadError("上传文件失败，请检查文件大小，控制在2M以内"))
        } else {
            const path = '/static/uploads/' + req.file.filename
            res.send(formatResponse(0, '', path))
        }
    })
});


module.exports = router;