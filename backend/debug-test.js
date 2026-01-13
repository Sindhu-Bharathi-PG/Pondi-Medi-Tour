const fs = require('fs');
try {
  fs.writeFileSync('debug_output.txt', 'Node is running and can write files.');
  console.log('File written');
} catch (e) {
  console.error(e);
}
