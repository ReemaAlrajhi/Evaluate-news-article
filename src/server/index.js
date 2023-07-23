var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');



const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))



const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY;


app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})



app.post('/check', async function(req, res) {
  const apiURL = baseURL+'key='+apiKey+'&url='+req.body.url+'&lang=en'
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    res.send({
      score_tag: data.score_tag,
      agreement: data.agreement,
      subjectivity: data.subjectivity,
      confidence: data.confidence
    })
  });
})