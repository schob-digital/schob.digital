import https from 'https';

https.get('https://vasilygenai.github.io/DJ_Vasily/', (res) => {
  let data = '';
  res.on('data', (d) => data += d);
  res.on('end', () => {
    console.log(data);
  });
});
