const express = require('express');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const stream = require("stream");
const fs = require('fs');
const fetch = require('cross-fetch');
const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.get('', (req, res) => {
  res.send('Hello express!')
})

app.post('/afd_pdf', (req, res) => {
  const reqBody = req.body;
  console.log('You provided Service Authorizer Name:' + reqBody.SERAUTHNAME + ', Service Number:' + reqBody.SERNUM + ', Service Authorizer Phone:' + reqBody.SERAUTHPH
    + ', Service Authorizer Email:' + reqBody.SERAUTHEMAIL + ', Service Authorizer Company Name:' + reqBody.SERAUTHCMPY + ', ModelNumber:' + reqBody.MODELNUMBER + ', SerailNumber:' + reqBody.SERIALNUMBER
    + ', Description:' + reqBody.DESCRIPTION);

    run().catch(err => console.log(err));

  async function run() {
    const content = await PDFDocument.load(fs.readFileSync('./template.pdf'));
    const form = content.getForm();
    const serviceauthname = form.getTextField('Service Authorizer Name');
    const servicenumber = form.getTextField('Service Number');
    const serviceauthph = form.getTextField('Service Authorizer Phone');
    const serviceauthemail = form.getTextField('Service Authorizer Email');
    const serviceauthcmpyname = form.getTextField('Service Authorizer Company Name');
    const modelnumber = form.getTextField('ModelNumber');
    const serialnumber = form.getTextField('SerialNumber');
    const desc = form.getTextField('Description');
    const sertype = form.getTextField('ServiceType');
    const custNotes = form.getTextField('Customer Notes');
    const shipcmpyname = form.getTextField('Shipping Company Name');
    const shipattto = form.getTextField('Shipping Attention To');
    const shipaddr1 = form.getTextField('Shipping Address 1');
    const shipaddr2 = form.getTextField('Shipping Address 2');
    const shipcity = form.getTextField('Shipping City');
    const shipcountry = form.getTextField('Shipping StateProvinceCountry');
    const shipzip = form.getTextField('Shipping ZipPostalCode');
    const shipph = form.getTextField('Shipping Phone');
    const modelnumber2 = form.getTextField('Model Number');
    const serialnumber2 = form.getTextField('Serial Number');


    serviceauthname.setText(reqBody.SERAUTHNAME);
    servicenumber.setText(reqBody.SERNUM);
    serviceauthph.setText(reqBody.SERAUTHPH);
    serviceauthemail.setText(reqBody.SERAUTHEMAIL);
    serviceauthcmpyname.setText(reqBody.SERAUTHCMPY);
    modelnumber.setText(reqBody.MODELNUMBER);
    desc.setText(reqBody.DESCRIPTION);
    serialnumber.setText(reqBody.SERIALNUMBER);
    sertype.setText('ZTEST');
    custNotes.setText('Test Notes /n 12345678990');
    shipcmpyname.setText('Ship Company');
    shipattto.setText('Shipping Attention Test');
    shipaddr1.setText('Vill number 230');
    shipaddr2.setText('Beeramguda');
    shipcity.setText('Hyderabad');
    shipcountry.setText('India');
    shipzip.setText('502032');
    shipph.setText('9603938536');
    modelnumber2.setText('TEST12345');
    serialnumber2.setText('SERIAL1234567');
    //res.setHeader('Content-disposition', 'attachment; filename=' + reqBody.form + '_' + reqBody.workorder + '.pdf');
    res.setHeader('Content-disposition', 'inline; filename=' + reqBody.FORM + '_' + reqBody.WORKORDER + '.pdf');
    res.setHeader('Content-type', 'application/pdf');
    // Write the PDF to a fil]e
    const pdfBytes = await content.save();
    const readStream = new stream.PassThrough();
    readStream.end(pdfBytes);
    readStream.pipe(res);
  }
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server is up on port', port)
})