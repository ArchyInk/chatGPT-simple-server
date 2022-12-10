/*
 * @author: Archy
 * @Date: 2022-12-10 22:04:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-12-11 00:08:45
 * @FilePath: \chatGPT\server\app.js
 * @description:
 */

var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const { WebSocketServer } = require('ws')
const { server } = require('http')

var questionRouter = require('./routes/question')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./web'))
app.use(async function (req, res, next) {
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    sessionToken: '',
  }) //token
  await api.ensureAuth()
  req.chatGptApi = api
  next()
})

app.use(async function (req, res, nect) {
  const wss = new WebSocketServer({ server, path: '/websocket' })
  req.wss = wss
  next()
})
app.use('/question', questionRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
