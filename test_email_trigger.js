const https = require('https');

const data = JSON.stringify({
  email: '35tolgayenice@gmail.com',
  username: 'Tolga Deneme'
});

const options = {
  hostname: 'us-central1-kiralik-sevgili.cloudfunctions.net',
  path: '/sendDeletionRequest',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
