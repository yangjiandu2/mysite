const express = require('express');
const router = express.Router();
const { formatResponse, analysisToken } = require('../utils/tool')

const { loginService ,updateAdminService} = require('../service/adminService')

// 登录
router.post('/login', async function (req, res, next) {
    // 首先应该有验证码验证

    // 验证通过
    let result = await loginService(req.body)
    if (result.token) {
        res.setHeader('authentication', result.token)
    }

    res.send(formatResponse(0, '操作成功', result.data))
});

// 恢复登录状态
router.get('/whoami', async function (req, res, next) {
    // 从客户端请求拿到token，然后 解析token还原成有用的信息
    let token = analysisToken(req.get('Authorization'))
    // 2. 返回给客户端
    res.send(formatResponse(0, '', { id: token.id, loginId: token.loginId, name: token.name }))
    console.log("🚀 ~ token:", token)

})

router.put('/update',async function(req,res,next){
    res.send(await updateAdminService(req.body))
})
module.exports = router;
