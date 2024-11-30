const blogModel = require("./model/blogModel")
const blogTypeModel = require("./model/blogTypeModel")


// 新增
module.exports.addBlogDao = async function (newBlogInfo) {
    const { dataValues } = await blogModel.create(newBlogInfo)
    return dataValues
}

// 分页查询
module.exports.findBlogByPageDao = async function (pageInfo) {
    if (pageInfo.catgoryId) {
        // 根据分类信息分页查询
        return await blogModel.findAndCountAll({
            // 关联
            include: [
                {
                    model: blogTypeModel,
                    as: "category",
                    where: {
                        id: pageInfo.catgoryId
                    }
                }
            ],
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    } else {
        // 根据所有博客分页进行查询
        return await blogModel.findAndCountAll({
            // 关联
            include: [
                {
                    model: blogTypeModel,
                    as: "category"  // 别名
                }
            ],
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    }
}