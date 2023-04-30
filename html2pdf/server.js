const express = require('express')
const puppeteer = require('puppeteer')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))

async function generateRandomFilename(extension) {
  const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const filenameLength = 10;
  let filename = "";
  
  for (let i = 0; i < filenameLength; i++) {
    filename += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
  }
  
  if (extension) {
    filename += "." + extension;
  }
  
  return filename;
}


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
      // const pdfBlob = new Blob(pdf, {type: 'application/pdf'})
      // const link = URL.createObjectURL(pdfBlob)
      await browser.close()  
      console.log('Done',pdf)
      return pdf
    } catch (error) {
      console.log(error)
    }
  }


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/',async (req,res)=>{
    console.log("subimt clicked")
    console.log(req.body)
    const pageUrl = req.body.pageUrl
    console.log("URL:",pageUrl)
    const pdfLink = await printPDF(pageUrl)
    const filename = await generateRandomFilename("pdf")
    console.log(filename)
    res.set('Content-Disposition', `attachment; filename=${filename}`);
    res.send(pdfLink);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}, url: http://localhost:${port}/`)
})