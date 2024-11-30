const express = require('express');
const { addBlogService, findBlogByPageSerive } = require('../service/blogService');
const router = express.Router();

// 添加博客
router.post('/', async function (req, res, next) {
    res.send(await addBlogService(req.body))
});

// 获取博客 分页
router.get('/', async function (req, res, next) {
    res.send(await findBlogByPageSerive(req.query))
});

// 获取单个博客
router.get('/:id', async function (req, res, next) {
});

// 修改单个博客
router.put('/:id', async function (req, res, next) {
});

// 删除单个博客
router.delete('/:id', async function (req, res, next) {
});


module.exports = router;