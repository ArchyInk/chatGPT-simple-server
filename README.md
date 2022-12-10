极其简单的chatGPT的server

sessionToken请在openai[https://chat.openai.com/]登录后在cookies获取并填充。

locolhost:8877请改成自己服务器地址，否则会跨域

将整个文件放入自己服务器后，`pnpm install`后用`pm2 start ./bin/www`

后面看情况优化一下吧
