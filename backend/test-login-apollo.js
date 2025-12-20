const http = require('http');

const data = JSON.stringify({
  email: 'apollo@pondimeditour.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 3001, 
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🧪 Testing Login API for Apollo Admin...');

const req = http.request(options, (res) => {
  console.log(`✅ Status Code: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => body += chunk);
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      if (res.statusCode === 200 && parsed.token) {
        console.log('🎉 Login Successful!');
        console.log('   User:', parsed.user.email);
        console.log('   Role:', parsed.user.userType || parsed.user.role);
        console.log('   Token:', parsed.token.substring(0, 20) + '...');
      } else {
        console.log('❌ Login Failed:', body);
      }
    } catch (e) {
      console.log('❌ Invalid Response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request Error:', error.message);
  console.log('   Is the backend running on port 5000?');
});

req.write(data);
req.end();
