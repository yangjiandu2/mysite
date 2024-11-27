const bannerModel = require("./model/bannerModel")
// 查找
module.exports.findBannerDao = async function(){
   return bannerModel.findAll()
}
// 更新
module.exports.updateBannerDao = async function(bannerArr){
    // 将表的记录全部删除
    await bannerModel.destroy({truncate:true})
    // 批量写入数据
    await bannerModel.bulkCreate(bannerArr)
    return await bannerModel.findAll()
}