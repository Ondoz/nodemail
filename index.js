const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path');
// const venom = require('venom-bot');

// Import routes
const apiRoutes = require("./routes/api")
// cors
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('root'))
// let session;
// venom
//     .create()
//     .then((client) => session = client)
//     .catch((erro) => {
//         console.log(erro);
//     });
//
//
// app.post('/wa/send', async function (req, res) {
//     let number  = req.body.phonenumber
//     let message = req.body.message
//
//     await session
//         .sendText(number + '@c.us', message)
//         .then((result) => {
//             console.log('Result: ', result); //return object success
//
//         })
//         .catch((erro) => {
//             console.error('Error when sending: ', erro); //return object error
//         });
//
//     res.json({
//         status: "success",
//         message: "Message send successfully"
//     })
// })
// app.post('/wa/send/file', async function (req, res) {
//     let number  = req.body.phonenumber
//     let message = req.body.message
//
//     await session
//         .sendText(number + '@c.us', message)
//         .then((result) => {
//             console.log('Result: ', result); //return object success
//
//         })
//         .catch((erro) => {
//             console.error('Error when sending: ', erro); //return object error
//         });
//
//     res.json({
//         status: "success",
//         message: "Message send successfully"
//     })
// })


// Use Api routes in the App
app.use('/api', apiRoutes)
app.use(express.static(path.join(__dirname, "/public")));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})