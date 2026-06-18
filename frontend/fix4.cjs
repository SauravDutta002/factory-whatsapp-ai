const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
content = content.replace('const fetchData = async () => {', 'async function fetchData() {');
fs.writeFileSync('src/App.jsx', content);
console.log('Fixed fetchData');
