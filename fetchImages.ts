import https from 'https';

https.get('https://vasilygenai.github.io/DJ_Vasily/assets/index-DLrfYETO.js', (res) => {
  let data = '';
  res.on('data', (d) => data += d);
  res.on('end', () => {
    const regex = /https?:\/\/[^"']*\.(?:png|jpg|jpeg|gif|webp|svg)/gi;
    const matches = data.match(regex);
    if (matches) {
      console.log(Array.from(new Set(matches)));
    } else {
      console.log('No image links found.');
    }
  });
});
