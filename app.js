// 引入包
const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt");
const ServiceError = require('./utils/errors')
const { ForbiddenError, UnknownError} = ServiceError

const md5 = require('md5');
const session = require("express-session")

// 默认读取项目目录根目录下的 .env 环境变量文件
require('dotenv').config()
require('express-async-errors');
// 引入数据库链接
require('./dao/db')

// 先做数据库链接再 引入路由
const adminRouter = require('./routes/admin');
const captchaRouter = require('./routes/captcha');
const bannerRouter = require('./routes/banner');


// 创建服务器实例
const app = express();

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:true,
  saveUninitialized:true
}))

// 使用各种路由中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置验证token接口
app.use(jwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ['HS256'], // 新版expressJWT必须要求指定算法
}).unless({
  // 需要排除的token 验证路由
  path: [
    { "url": '/admin/login', methods: ['POST'] },
    { "url": '/res/captcha', methods: ['GET'] },
    { "url": '/banner', methods: ['GET'] },
  ]
}))


// 使用路由中间件
app.use('/admin', adminRouter);
app.use('/res/captcha', captchaRouter);
app.use('/banner', bannerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理 一旦发生错误进入这里
app.use(function (err, req, res, next) {
  if(err){
    const { message } = err
    console.log("🚀 ~ message:", message)
  }
  // 说明是token 无效 验证错误
  if (err.name === "UnauthorizedError") {
    res.send(new ForbiddenError('未登录，或者登录失效').toResponseJSON())
  }else if (err.constructor === ServiceError.ValdationError) {
    res.send(err.toResponseJSON())
  } else {
    res.send(new UnknownError().toResponseJSON())
  }

});
 


module.exports = app;
