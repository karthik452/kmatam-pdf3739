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
    + ', Description:' + reqBody.DESCRIPTION + ', Service Type:' + reqBody.SERTYPE + ', Customer Notes:' + reqBody.CUSTNOTES + ',Shipping Company Name' + reqBody.SHIPCMPYNAME
    + ', Shipping Attention To' + reqBody.SHIPATTO + ', Shipping Address 1' + reqBody.SHIPADDR1 + ', Shippig Address 2' + reqBody.SHIPADDR2 + ', Shipping City' + reqBody.SHIPCITY
    + ', Shipping Country' + reqBody.SHIPCOUNTRY + ', Shipping Zip Code' + reqBody.SHIPZIP + ', Shipping Phone' + reqBody.SHIPPH + ', Model Number' + reqBody.MODELNUMBER2 + ', Serail Number' + reqBody.SERIALNUMBER2);

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
    sertype.setText(reqBody.SERTYPE);
    custNotes.setText(reqBody.CUSTNOTES);
    shipcmpyname.setText(reqBody.SHIPCMPYNAME);
    shipattto.setText(reqBody.SHIPATTO);
    shipaddr1.setText(reqBody.SHIPADDR1);
    shipaddr2.setText(reqBody.SHIPADDR2);
    shipcity.setText(reqBody.SHIPCITY);
    shipcountry.setText(reqBody.SHIPCOUNTRY);
    shipzip.setText(reqBody.SHIPZIP);
    shipph.setText(reqBody.SHIPPH);
    modelnumber2.setText(reqBody.MODELNUMBER2);
    serialnumber2.setText(reqBody.SERIALNUMBER2);
    //res.setHeader('Content-disposition', 'attachment; filename=' + reqBody.form + '_' + reqBody.workorder + '.pdf');
    res.setHeader('Content-disposition', 'inline; filename=' + reqBody.SERNUM + '_' + reqBody.SERAUTHNAME + '.pdf');
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