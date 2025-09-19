// bcrypt_lab.js
const bcrypt = require('bcrypt');

// Step 4: Generating a Salt and Hashing a Password
async function hashPassword() {
  const password = 'hello003'; // Replace with your password

  try {
    // Generate a salt with 10 rounds (you can adjust this number)
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password (async):', hashedPassword);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Step 6: Comparing a Password with a Hash
async function comparePassword(password, hashedPassword) {
  try {
    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Step 7: Using bcrypt.hashSync()
const password = 'mySecurePassword';

// Hash password synchronously with 10 salt rounds
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log('Synchronous Hashed Password:', hashedPassword);

// Call the async functions
hashPassword();

// ✅ Pass the sync-generated hash to comparePassword
comparePassword(password, hashedPassword);
