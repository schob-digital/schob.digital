const fs = require('fs');

const input = fs.readFileSync('c:/App/schob.digital/Datenschutz.uk.txt', 'utf8');
const lines = input.split('\n');

let jsx = `export function DatenschutzUK() { return (<div className="legal-container w-full max-w-4xl py-24 px-6 md:px-14 text-white">
    <section className="legal-hero card-glass">
      <p className="eyebrow eyebrow--dark">Юридична інформація</p>
      <h1>Політика конфіденційності</h1>
      <p>Тут ви знайдете політику конфіденційності щодо використання цього вебсайту, а також прямого контакту електронною поштою чи телефоном.</p>
    </section>

    <nav className="legal-jump-nav" aria-label="Privacy Policy Jump Links">
      <a href="#section-1">Контролер даних</a>
      <a href="#section-1-1">Шифрування SSL/TLS</a>
      <a href="#section-2-4">Контактна форма</a>
      <a href="#section-2-6-2">Google Analytics</a>
      <a href="#section-6">Ваші права</a>
      <a href="#section-6-2">Право на заперечення</a>
    </nav>

    <section className="legal-content card-glass">
      <article className="legal-text">
`;

let inList = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (line.match(/^[0-9]+\.\s/)) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    const id = line.split(' ')[0].replace('.', '');
    jsx += `        <h2 id="section-${id}">${line}</h2>\n`;
  } else if (line.match(/^[0-9]+\.[0-9]+\.\s/)) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    const id = line.split(' ')[0].replace(/\./g, '-').slice(0, -1);
    jsx += `        <h3 id="section-${id}">${line}</h3>\n`;
  } else if (line.match(/^[0-9]+\.[0-9]+\.[0-9]+\.\s/)) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    const id = line.split(' ')[0].replace(/\./g, '-').slice(0, -1);
    jsx += `        <h4 id="section-${id}">${line}</h4>\n`;
  } else if (line.startsWith('- ')) {
    if (!inList) { jsx += `        <ul>\n`; inList = true; }
    jsx += `          <li>${line.substring(2)}</li>\n`;
  } else if (line.startsWith('ПРАВО НА ЗАПЕРЕЧЕННЯ') || line.startsWith('ВИ МАЄТЕ ПРАВО') || line.startsWith('ЗАПЕРЕЧЕННЯ ПРОТИ') || line.startsWith('В ОКРЕМИХ ВИПАДКАХ') || line.startsWith('schobvasily.digital@gmail.com') && lines[i-1].includes('ЗАПЕРЕЧЕННЯ')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    if (line.match(/^[А-ЯІЇЄҐA-Z ]+$/)) {
      jsx += `        <h4>${line}</h4>\n`;
    } else {
      jsx += `        <p>${line}</p>\n`;
    }
  } else if (line.startsWith('http')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    jsx += `        <p><a href="${line}" target="_blank" rel="noopener noreferrer">${line}</a></p>\n`;
  } else if (line.includes('[[COOKIE_SETTINGS_BUTTON]]')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    jsx += `        <div className="legal-action">\n          <button className="button button--ghost legal-action__button" type="button" data-open-cookie-settings>Відкрити налаштування файлів cookie</button>\n        </div>\n`;
  } else {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    jsx += `        <p>${line}</p>\n`;
  }
}

if (inList) { jsx += `</ul>\n`; }

jsx += `      </article>
    </section>
  </div>);
}
`;

fs.writeFileSync('c:/App/schob.digital/src/DatenschutzUK.tsx', jsx);
