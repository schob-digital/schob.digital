import https from 'https';

https.get('https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/index.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
