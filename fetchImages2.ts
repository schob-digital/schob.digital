import https from 'https';

https.get('https://vasilygenai.github.io/DJ_Vasily/assets/index-DLrfYETO.js', (res) => {
  let data = '';
  res.on('data', (d) => data += d);
  res.on('end', () => {
    const urls = data.match(/https?:\/\/[^"']*/g);
    if(urls) {
      console.log(Array.from(new Set(urls.filter(u => u.includes('image') || u.includes('photo') || u.endsWith('.png') || u.endsWith('.jpg') || u.endsWith('.jpeg')))));
    }
  });
});
