const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path');

// Import routes
const apiRoutes = require("./routes/api")
// cors
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('root'))

app.get('/wa/create/:name', function (req, res) {
  venom.create(
          req.params.name,
          async (base64Qr, asciiQR) =>  {
            console.log(asciiQR); // Optional to log the QR in the terminal
            var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
              return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');

            var imageBuffer = response;
            await require('fs').writeFile(
                'public/out.png',
                imageBuffer['data'],
                'binary',
                function (err) {
                  if (err != null) {
                    console.log(err);
                  }
                }
            );
            res.json({
              status: "success",
              message: "Email successfully",
              data: req.headers.host + 'public/out.png'
            })
          },
          undefined,
          { logQR: false }
      )
      .then((client) => {
        console.log(client)
      })
      .catch((error) => console.log(error));
})

// Use Api routes in the App
app.use('/api', apiRoutes)
app.use(express.static(path.join(__dirname, "/public")));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`)
})