const axios = require('axios');
const jwt = require('jsonwebtoken');

async function testDashboardAPI() {
  console.log('=== Testing Dashboard API ===\n');

  // First, login to get a token
  const loginData = {
    email: 'apollo@pondimeditour.com',
    password: 'password123'
  };

  try {
    console.log('1. Logging in...');
    const loginRes = await axios.post('http://localhost:3001/api/auth/login', loginData);
    console.log('   Login success!');
    console.log('   Token:', loginRes.data.token ? loginRes.data.token.substring(0, 50) + '...' : 'MISSING');
    console.log('   User:', loginRes.data.user);

    const token = loginRes.data.token;

    // Decode the token to see payload
    const decoded = jwt.decode(token);
    console.log('\n2. Token payload:', decoded);

    // Now call the dashboard endpoint
    console.log('\n3. Calling /api/hospitals/me/dashboard...');
    const dashRes = await axios.get('http://localhost:3001/api/hospitals/me/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('\n✅ Dashboard Response:');
    console.log(JSON.stringify(dashRes.data, null, 2));

  } catch (error) {
    console.log('\n❌ Error:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

testDashboardAPI();
