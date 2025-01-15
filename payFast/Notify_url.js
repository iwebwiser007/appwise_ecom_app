const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// PayFast notify URL handler
app.post('/notify', (req, res) => {
  const payfastData = req.body;

  // Example: Validate the received data (use your passphrase if configured)
  const passphrase = 'your_passphrase_here';
  let validationString = Object.keys(payfastData)
    .filter((key) => key !== 'signature')
    .sort()
    .map((key) => `${key}=${encodeURIComponent(payfastData[key])}`)
    .join('&');

  if (passphrase) {
    validationString += `&passphrase=${encodeURIComponent(passphrase)}`;
  }

  // Generate signature
  const generatedSignature = crypto
    .createHash('md5')
    .update(validationString)
    .digest('hex');

  if (generatedSignature === payfastData.signature) {
    console.log('Payment Validated:', payfastData);
    res.status(200).send('OK');
  } else {
    console.log('Validation Failed');
    res.status(400).send('Invalid signature');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
