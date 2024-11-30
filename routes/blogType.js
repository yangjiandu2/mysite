const express = require('express');
const { addBlogType, findAllBlogTypeService, findOneBlogTypeService, updateOneBlogTypeService, deleteOneBlogTypeService } = require('../service/blogTypeService');
const router = express.Router();

// 添加博客分类
router.post('/', async function (req, res, next) {
    res.send(await addBlogType(req.body))
});

// 获取博客分类
router.get('/', async function (req, res, next) {
    res.send(await findAllBlogTypeService())
});

// 获取单个博客分类
router.get('/:id', async function (req, res, next) {
    res.send(await findOneBlogTypeService(req.params.id))
});

// 修改单个博客分类
router.put('/:id', async function (req, res, next) {
    res.send(await updateOneBlogTypeService(req.params.id,req.body))
});

// 删除单个博客分类
router.delete('/:id', async function (req, res, next) {
    res.send(await deleteOneBlogTypeService(req.params.id))
});


module.exports = router;