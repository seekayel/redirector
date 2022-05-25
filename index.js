const express = require('express')
const app = express()
const AWS = require("aws-sdk");


AWS.config = new AWS.Config({
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});
const s3 = new AWS.S3()

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################

// Catch all handler for all other request.
app.use('/support', (req,res) => {
  const url = 'https://discord.gg/46tfWcw4K5'
  res.set('Location', url)
  res.status('302').send(`<a href='${url}'>Found</a>.`)
})

app.get('/cheers', async (req,res) => {
  let key = 'cheers.mp4'

  let url = s3.getSignedUrl("getObject", {
    Key: key,
    Bucket: process.env.BUCKET,
    Expires: 900, // default is 900 seconds (15 minutes)
  });

  res.set('Location', url)
  res.status('302').send(`<a href='${url}'>Found</a>.`)
})

app.get('/bob', async (req,res) => {

  let my_file = await s3.getObject({
    Bucket: process.env.BUCKET,
    Key: "bob-test.txt",
  }).promise()

  console.log(my_file)

  res.set('Content-type', 'text/plain')
  res.send(my_file.Body.toString()).end()

})

// Catch all handler for all other request.
app.use('*', (req,res) => {
  const url = process.env.REDIRECT_URL || 'https://discord.gg/huhcqxXCbE'
  res.set('Location', url)
  res.status('302').send(`<a href='${url}'>Found</a>.`)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`)
})
