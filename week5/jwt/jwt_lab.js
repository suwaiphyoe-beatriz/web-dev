const jwt = require('jsonwebtoken');

const secretKey = 'f2d761cb16726ecb0e304b11b48c915f02aec09549e3c0c7c288c6261c554be1f78de63569710a4bec6e2493b8c57156928d10c609a1094d2db1c1332febfd5a';
// Function to create and sign a JWT
function createJWT() {
  const payload = {
    userId: 123,
    username: 'exampleUser'
  };

  const token = jwt.sign(payload, secretKey);
  console.log('JWT Token:', token);
  return token;
}

// Function to verify a JWT
function verifyJWT(token) {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
    } else {
      console.log('JWT Verified. Decoded:', decoded);
    }
  });
}

// Function to decode a JWT
function decodeJWT(token) {
  const decoded = jwt.decode(token);
  console.log('Decoded JWT:', decoded);
}

// ---- Run the flow ----
const token = createJWT();
verifyJWT(token);
decodeJWT(token);
