
const svgCaptcha = require('svg-captcha')

module.exports.getCaptchaService = async function(){
    return svgCaptcha.create({
        size:4,
        ignoreChars:"iI0o1",
        noise:6,
        color:true
    })
}