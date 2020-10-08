const express = require('express')
const app =  express()
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const port = process.env.port || 3001
const path = require('path')

// app.use(express.static(path.join(__dirname, './build')))
app.use(morgan("default"))
app.use(cors({
    origin : 'http://localhost:3000'
}))


app.get('/pdffile', (req, res) => {
    // For Downloading server side PDF file
    const src = fs.createReadStream('./MainMemo.pdf');

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=MainMemo.pdf',
        'Content-Transfer-Encoding': 'Binary'
    });

    console.log(src)
    src.pipe(res);
})

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './build', 'index.html'))
//  })

app.listen(port, () => {
    console.log("Server is start at the PORT.NO __" + port)
})
