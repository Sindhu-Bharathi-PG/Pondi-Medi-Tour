const http = require('http');

const usersToTest = [
  { email: 'apollo@pondimeditour.com', password: 'password123' },
  { email: 'superadmin@pondimeditour.com', password: 'password123' },
  { email: 'hospital@test.com', password: 'password123' }
];

function testLogin(user) {
  const data = JSON.stringify(user);
  
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

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log(`\nTesting ${user.email}:`);
      console.log(`Status: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log('✅ Success!');
      } else {
        console.log(`❌ Failed: ${body}`);
      }
    });
  });

  req.on('error', (e) => {
    console.log(`\nTesting ${user.email}:`);
    console.error(`❌ Connection Error: ${e.message}`);
    console.error('Is the backend server running on port 3001?');
  });

  req.write(data);
  req.end();
}

console.log('🔍 Starting Login Diagnostics...');
usersToTest.forEach(user => testLogin(user));
