### 正确的食用方式

1. 安装依赖包：`npm install`
2. 配置 `.env` 文件，内容参考 `.env.example`
3. 请正确配置 `APP_KEY` ！！！！！！！！！！！
4. 请正确配置 `APP_KEY` ！！！！！！！！！！！
5. 请正确配置 `APP_KEY` ！！！！！！！！！！！
6. 启动服务器(开发模式)：`npm run dev`
7. 可通过 Postman 等工具测试接口

这个服务器主要用来缓存来自第三方的数据。为什么要缓存？因为不是会员，每天请求数据的次数有限，当我们修改前端代码时，非常容易造成请求浪费。所以使用服务器缓存一下数据，有利于前端页面的开发

服务器将数据存放在 `Map` 对象中，也就是说，重启服务器将会导致数据丢失，会重新请求数据并缓存