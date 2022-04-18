const express = require('express')
const app = express()

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
app.use('*', (req,res) => {
  const url = 'https://discord.gg/huhcqxXCbE'
  res.set('Location', url)
  res.status('302').send(`<a href='${url}'>Found</a>.`)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`index.js listening at http://localhost:${port}`)
})
