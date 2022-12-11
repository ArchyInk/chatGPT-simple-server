/*
 * @author: Archy
 * @Date: 2022-12-10 22:04:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-12-11 21:43:18
 * @FilePath: \chatGPT\server\routes\question.js
 * @description:
 */
var express = require('express')
var router = express.Router()

let question = ''
/* GET users listing. */
router.post('/', function (req, res, next) {
  question = req.body.question
  res.send({
    status: 1,
    msg: '提问成功',
  })
})

router.get('/', async function (req, res, next) {
  try {
    res.writeHead(200, { 'Content-Type': 'text/event-stream' })
    const answer = await req.conversition.sendMessage(question, {
      onProgress: (answer) => {
        res.write('event:message\n')
        res.write('data: ' + answer + '\n\n')
      },
    })
    res.write('event:close\n')
    res.write('data: ' + answer + '\n\n')
  } catch (err) {
    res.write('event:error\n')
    res.write('data: ' + err.toString() + '\n\n')
  }
})

module.exports = router
