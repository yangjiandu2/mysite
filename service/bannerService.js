const { findBannerDao, updateBannerDao } = require("../dao/bannerDao")
const { formatDataPattern, formatResponse } = require("../utils/tool")


module.exports.findBannnerService = async function(){
    const data =  formatDataPattern(await findBannerDao())
    return formatResponse(0,'',data)
}
module.exports.updateBannnerService = async function(bannerArr){
    const data = formatDataPattern(await updateBannerDao(bannerArr))
    console.log("🚀 ~ module.exports.updateBannnerService=function ~ data:", data)
    
    return formatResponse(0,'',data)
}