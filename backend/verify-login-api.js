const axios = require('axios');

async function testLogin() {
  // Test the MAIN server on port 3001
  const url = 'http://localhost:3001/api/auth/login';
  const data = {
    email: 'apollo@pondimeditour.com',
    password: 'password123'
  };

  try {
    console.log(`📡 Sending POST to ${url}...`);
    console.log('📦 Payload:', data);

    const response = await axios.post(url, data);
    
    console.log('✅ Success!');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    
  } catch (error) {
    console.log('❌ Error Response:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

testLogin();
