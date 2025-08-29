const fs = require('fs');

// Create a sample.txt file and add some text
// The synchronous write method is used here to ensure the file exists before we try to read it.
try {
  fs.writeFileSync('sample.txt', 'This is a test file for the fs module.');
  console.log('sample.txt created successfully.');
} catch (err) {
  console.error('Error creating file:', err);
}

// Read the contents of sample.txt
fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});

// Write data to a new file (output.txt)
fs.writeFile('output.txt', 'This is some sample data.', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Data written to output.txt');
});

const os = require('os');

console.log("-----------------------------------");
console.log('Hostname:', os.hostname());
console.log('Platform:', os.platform());
console.log('CPU cores:', os.cpus().length);
console.log('Architecture:', os.arch());