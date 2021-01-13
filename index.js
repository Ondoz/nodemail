const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Import routes
const apiRoutes = require("./routes/api")
// cors
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('root'))

// Use Api routes in the App
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})