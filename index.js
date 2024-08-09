const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

//routes/URL/endpoint utama
app.get('/', (req, res) => {
  res.send('Hello Johnny')
})

app.get('/hello', (req, res) => {
    console.log({ urlParam: req.query })
    res.send('Euy')
  })  

app.post('/login', (req, res) => {
    console.log({requestFromOutside: req.body})
    res.send('login successful')
})

app.put('/username', (req,res) => { 
    console.log({ updateData: req.body})
    res.send('update berhasil')
})

app.listen(port, () =>{
  console.log(`Example app listening on port ${port}`)
})