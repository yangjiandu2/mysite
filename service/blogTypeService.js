const { validate } = require("validate.js")
const { ValdationError } = require("../utils/errors")
const { addBlogTypeDao, findAllBlogTypeDao, findOneBlogTypeDao, updateBlogTypeDao, deleteBlogTypeDao } = require("../dao/blogTypeDao")
const { formatResponse, formatDataPattern } = require("../utils/tool")
const { blogTypeRule } = require("../utils/dataRule")

// 新增
module.exports.addBlogType = async function (newBlogTypeInfo) {
    // 进行数据验证
    const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule /*规则验证*/)
    // 验证通过
    if (!validateResult) {
        newBlogTypeInfo.articleCount = 0; // 因为是新曾的文章分类，文章数量为0
        return formatResponse(0, "", await addBlogTypeDao(newBlogTypeInfo))
    } else {
        // 验证失败
        throw new ValdationError("数据验证失败")
    }
}

// 查询全部博客分类
module.exports.findAllBlogTypeService = async function () {
    const data = formatDataPattern(await findAllBlogTypeDao())
    const arr = data.sort((a, b) => a.order - b.order)
    return formatResponse(0, '', arr)
}

// 获取其中一个分类
module.exports.findOneBlogTypeService = async function (id) {
    const data = await findOneBlogTypeDao(id)
    return formatResponse(0, '', data)
}

// 修改其中一个分类
module.exports.updateOneBlogTypeService = async function (id, newBlogTypeInfo) {
    const data = await updateBlogTypeDao(id,newBlogTypeInfo)
    return formatResponse(0,'',data)
}

// 删除其中一个分类
module.exports.deleteOneBlogTypeService = async function (id) {
    await deleteBlogTypeDao(id)
    // 这里需要返回这个受影响的文章数量，写了文章模块后再回来修改
    return formatResponse(0,"",true)
}