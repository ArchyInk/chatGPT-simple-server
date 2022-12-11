/*
 * @author: Archy
 * @Date: 2022-12-10 22:04:40
 * @LastEditors: Archy
 * @LastEditTime: 2022-12-11 21:32:31
 * @FilePath: \chatGPT\server\app.js
 * @description:
 */

var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var questionRouter = require('./routes/question')

var indexRouter = require('./routes')
var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('./web'))
app.use(async function (req, res, next) {
  const { ChatGPTAPI } = await import('chatgpt')
  const api = new ChatGPTAPI({
    sessionToken:
      'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..33iLvvr1vS4g20a2.lYN2gvMMkm3ZtnURvNQ4r25GBg2UQqCcaLFnmoETZxblUyliAWBfADBWBPrijUmy53VzFtfWuOkfkApDBs1ZJlmOAcum8pQH4N6CsJ_6hSeOrEtNeSqCBI0ClWoTmj59JOVmC-wMavWnwUdiYL6B55pVRbOfX8lzcohuOfJAB7m2kZ3VgRbPFGNG8gFX9B-NyADbhuUk-R2Qaua8iJ3N2doTYGk_UobCaprTTHs7Kyzoj1-mQxl-NmTKK1TTzzUV9-u9Y7_XhBb_frm3vyGzVpAuTxOn2ovhtUKxIA-4Z2FvcTtR880Tj29o0JlV_hnpcb6oN4AfPwNH42wbT0btrV_kxTYLlaNFYnMKgeO_l98_j8GQeae2c951fx-Jlr8hjOfGlKyrfljJnL-FbpWQXpxKMorQkP_0iQRy5xXAntr-2zDqsIjtxZ9OolIJNBFIayC3vCRA01pnwvfkOS7mp5YH-Qa5wuGBzK2rZTe_Bc8XIOgcenjMWUocRgAAfvH1a-vGxSqnxBvKl5qrSFmyGvX9mA1yI59JPmi2zhz2KHAUR2j58k8_j402ebURzUZLWdfD9HL1LKxg9uEb4C9mXlwIk32na2cIQbzhYfQy0uY_X0bJnQwRy-7IuUFOEOTkYr5jf0tr6-t65c9Yv0xfi1eLOnaJ4845__zSJerSHOSXyzP_1aanF839_4W0TR1-7A6a-yMNrTZgVy0kKR57ObAI-2C8ZVFDB9Hq5ojfQE3oMUgigFqYXJgv2c83fkV8ZCRJ4cXY9CC6ZQlqYyZnIr5DIJJ5775GY4w3OnykKB4mmyrCwfCCakRWTGqhKZ1HSd8mvK573lsk1gMlgGWXbZgwVfcCgzkZDkc1T9eRPckX-_zhz3QbMBJS2Q080ZA4At10ckcBLPza5qY6ZpoGd1LbKH53iT1kdWPt8uRTTSqZ0OHEt8OAySquEu_lm019dfb7rtmtRc9KPsz1ybhkkZ_6fB3YjenU3htEImwsDrpDWwlOCHNzy_fCOuq_FyPfNgZnrA0lW2-lXANAHylmo-Xv-lohWDb5PWN-ilIlbqjEQwGU4loSbNLAV2ePPCHA1s9-jnB1N8zQduypa9n_ijxKiAETd3xFQQSA1ws15qrXvUOH9RBUsYA1rqheHZS3MNy1pSpx_xWcyP9D2B-KDrsJuDi3rKlf_dUhf-atQebxQT_d6Hre1HqNcCiLY7jaOo8OGXqfxbsJJawCv7OaYekx_aUh_mJ_wS1ml9dzi5s0UtyfBuk_VQT0VlqqUdbfqT1ezCUdkOQSJS_kTOgZQaKMLYpcxaCCpTnD9d6KPFFMqo-nXAt22JWZVlEx1N3haULUUB7GGZqaASxvOftk3rmcJEYIFbjYPhEF0aQZMqcH00WeavdcUNCB3jw7nkweYhxWp4t1melLvDu0EDWf0kiDrvqq__yJHQGuXvW0BMbxZsZYlb6EOi13ZnWe2C4VYupxfB-vmdTQ3Sf03BsvCYWTTgFh6VJXH9-784I98Zu_UlmuJG0ss0hmkq-M6Vgpxa1UKuryKA4DdARm9nSWkBNq1DSm_rzCb0fHkz291_pq-j8CXMmXKdPAfpOZoYdxexOHOob496eLi76TeURCPAkecSivc_SHq7fbfIWuKSCFHELR3ttsAxycf-HMsxd0wEogz2r2YORwamxKYyQl4wu814Y6IgEh_f0XhzcnZZaDn6BdRQZKK7ZvPvbwnugjgmX-J_KXKUU40Oq5WASh-6miXSYLUSr8ASPhq3cgRxjC-jBuQ7g1gI0FCCBajsmJe7o_cElXIRnF417tuMIp75hlhzJNZCU5vRPfAVd_frp9h0xX6dvZMoSCsVfzAYL158qG_WcUJd3F4u34Tpku55-BRtt0Y7COcF1StugVERVdcuAhlFr51Rf3uMYSRHLC9gcMA7fymN6T6CxpLYknGgcZksEgAY_2-E8aSDgc-YqsOcDxGVLSYpntQv7OapM9tcAnGbnZK7IN7ZF-UufGKEeYjDGDvkelEygbyuHvCUKRDz0lsFEvwrdFO43gQg1WLBWQJ1Xv4cgrpnjK8HGt3G-gluo7RpE0BC7CeiND9rbjNEQW94p4iUkbSlWaG04weZViNUxtIKzc4BIm6SQma_VqbQndstzevAjFCcEK_W35vuRntZuzXReuEfGJORaYMKPMwpnvkoGH-UG-lTMm0SGz0_syFknKwi33XVvg3ZurZr_MTghvBGeuX3EowpQ59YGUMQ.uqUfUnHSijajmPr3hlklLA',
  }) //token
  await api.ensureAuth()
  req.conversition = api.getConversation()
  next()
})

app.use('/', indexRouter)
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
