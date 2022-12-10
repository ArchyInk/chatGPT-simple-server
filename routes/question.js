/*
 * @author: Archy
 * @Date: 2022-12-10 22:04:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-12-10 23:59:05
 * @FilePath: \chatGPT\server\routes\question.js
 * @description:
 */
var express = require('express')
var router = express.Router()

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const body = req.body
  console.log(req.wss)
  try {
    await req.chatGptApi.sendMessage(body.question, {
      onProgress: (answer) => {
        res.send({
          status: 1,
          msg: 'success',
          data: answer,
        })
      },
    })
  } catch (err) {
    res.send({
      status: 0,
      msg: err.toString(),
    })
  }
})

module.exports = router
