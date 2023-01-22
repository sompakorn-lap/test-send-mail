const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(`${__dirname}/dist`))

async function sendEmail(receiver, message) {
  const data = JSON.stringify({
    'Messages': [{
      'From': {'Email': ''},
      'To': [{'Email': receiver}],
      'Subject': 'test',
      'TextPart': message
    }]
  })

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: {'Content-Type': 'application/json'},
    auth: {username: '', password: ''},
  }

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}

app.post('/api', function (req, res) {
    const {receiver, message} = req.body
    // console.log(receiver, message)
  sendEmail(receiver, message)
  res.send('successful')
})

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(3000, () => { console.log('runing port 3000') })