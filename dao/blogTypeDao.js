// 添加博客分类

const { NotFoundError } = require("../utils/errors")
const blogTypeModel = require("./model/blogTypeModel")

module.exports.addBlogTypeDao = async function (newBlogTypeInfo) {
    const { dataValues } = await blogTypeModel.create(newBlogTypeInfo)
    return dataValues
}

// 获取所有数据分类
module.exports.findAllBlogTypeDao = async function () {
    const { dataValues } = await await blogTypeModel.findAll()
    return dataValues
}

// 查询单个数据
module.exports.findOneBlogTypeDao = async function (id) {
    const { dataValues } = await blogTypeModel.findByPk(id)
    return dataValues
}

// 查询单个数据
module.exports.findOneBlogTypeDao = async function (id) {
    const { dataValues } = await blogTypeModel.findByPk(id)
    return dataValues
}

// 修改博客
module.exports.updateBlogTypeDao = async function (id, blogTypeInfo) {
    await blogTypeModel.update(blogTypeInfo, {
        where: {
            id
        }
    })
    const { dataValues } = await blogTypeModel.findByPk(id)
    return dataValues
}

// 删除博客
module.exports.deleteBlogTypeDao = async function (id) {
    const data = await blogTypeModel.findByPk(id)
    if (data) {
        return await data.destroy()
    } else {
        throw new NotFoundError("数据不存在，或者已被删除")
    }
}

// 根据id 新增对应博客分类的文章数量
module.exports.addBlogToType = async function(id){
    const data = await blogTypeModel.findByPk(id)
    data.articleCount++; // 文章数量增加
    data.save()
    return
}