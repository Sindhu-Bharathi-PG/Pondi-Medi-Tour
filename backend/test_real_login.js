const http = require('http');

const postData = JSON.stringify({
  email: 'hospital@svmchrc.ac.in',
  password: '123456'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`Attempting login for ${JSON.parse(postData).email}...`);

const fs = require('fs');

const logToFile = (msg) => {
    fs.appendFileSync('login_result_debug.txt', msg + '\n');
    console.log(msg);
};

const req = http.request(options, (res) => {
  logToFile(`STATUS: ${res.statusCode}`);
  
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
        const json = JSON.parse(data);
        if (json.debug_hash) {
            logToFile(`SERVER HASH: ${json.debug_hash}`);
        }
        if (json.db_url) {
            logToFile(`DB URL STATUS: ${json.db_url}`);
        }
        
        if (res.statusCode === 200 && json.token) {
            logToFile("LOGIN SUCCESS! Token received.");
        } else {
            logToFile("LOGIN FAILED.");
        }
    } catch (e) {
        logToFile("Response was not JSON.");
        logToFile("Body: " + data);
    }
    process.exit(0);
  });
});

req.on('error', (e) => {
  logToFile(`problem with request: ${e.message}`);
  process.exit(1);
});

// Write data to request body
req.write(postData);
req.end();
