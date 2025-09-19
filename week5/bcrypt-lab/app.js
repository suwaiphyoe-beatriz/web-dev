// bcrypt_lab.js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);

    return hashedPassword; 
  } catch (error) {
    console.error('Error during hashing:', error);
    return null;
  }
}


async function comparePassword(inputPassword, storedHash) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, storedHash);

    if (isMatch) {
      console.log('Password is correct.');
    } else {
      console.log('Password is incorrect.');
    }
  } catch (error) {
    console.error('Error during comparison:', error);
  }
}


const passwordSync = 'mySecurePassword';
const saltSync = bcrypt.genSaltSync(10);
const hashedPasswordSync = bcrypt.hashSync(passwordSync, saltSync);
console.log('Synchronous Hashed Password:', hashedPasswordSync);


const passwordToHash = 'hello003';
hashPassword(passwordToHash)
  .then(hashedResult => {
    if (hashedResult) {
      return comparePassword(passwordToHash, hashedResult);
    }
  });