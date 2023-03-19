const express = require('express')
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))

async function printPDF(pageUrl) {
    // const browser = await puppeteer.launch({ headless: true });
    // const page = await browser.newPage();
    // await page.goto(pageUrl, {waitUntil: 'networkidle0'});
    try {
      browser = await puppeteer.launch({
        headless: true
      })
      console.log('Loading...')
      const page = await browser.newPage()
      page.once('load', () => console.log('Page loaded!'))
      page.on('error', err => console.log(err))
      console.log("Until here")
      await page.goto(pageUrl, {waitUntil: 'networkidle0'})
      const pdf = await page.pdf({ format: 'A4' });
      const pdfBlob = new Blob(pdf, {type: 'application/pdf'})
      const link = URL.createObjectURL(pdfBlob)
      await browser.close()  
      console.log('Done',link)
      return link
    } catch (error) {
      console.log(error)
    }
  }


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Welcome to Api')
})

app.post('/result',async (req,res)=>{
    console.log("subimt clicked")
    console.log(req.body)
    const pageUrl = req.body.pageUrl
    console.log("URL:",pageUrl)
    const pdfLink = await printPDF(pageUrl)
    res.json({link : pdfLink})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})