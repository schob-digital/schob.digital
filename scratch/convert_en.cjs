const fs = require('fs');

const input = fs.readFileSync('c:/App/schob.digital/Datenschutz.en.txt', 'utf8');
const lines = input.split('\n');

let jsx = `export function DatenschutzEN() { return (<div className="legal-container w-full max-w-4xl py-24 px-6 md:px-14 text-white">
    <section className="legal-hero card-glass">
      <p className="eyebrow eyebrow--dark">Legal</p>
      <h1>Privacy Policy</h1>
      <p>Here you will find the privacy policy for the use of this website as well as for direct contact by email or phone.</p>
    </section>

    <nav className="legal-jump-nav" aria-label="Privacy Policy Jump Links">
      <a href="#section-1">Controller</a>
      <a href="#section-1-1">SSL / TLS</a>
      <a href="#section-2-4">Contact form</a>
      <a href="#section-2-6-2">Google Analytics</a>
      <a href="#section-6">Your Rights</a>
      <a href="#section-6-2">Right to object</a>
    </nav>

    <section className="legal-content card-glass">
      <article className="legal-text">
`;

let inList = false;
let sectionCounter = 0;

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
  } else if (line.startsWith('RIGHT TO OBJECT') || line.startsWith('YOU HAVE THE RIGHT') || line.startsWith('OBJECTION TO') || line.startsWith('IN INDIVIDUAL CASES') || line.startsWith('schobvasily.digital@gmail.com') && lines[i-1].includes('OBJECTION')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    if (line.match(/^[A-Z ]+$/)) {
      jsx += `        <h4>${line}</h4>\n`;
    } else {
      jsx += `        <p>${line}</p>\n`;
    }
  } else if (line.startsWith('http')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    jsx += `        <p><a href="${line}" target="_blank" rel="noopener noreferrer">${line}</a></p>\n`;
  } else if (line.includes('[[COOKIE_SETTINGS_BUTTON]]')) {
    if (inList) { jsx += `</ul>\n`; inList = false; }
    jsx += `        <div className="legal-action">\n          <button className="button button--ghost legal-action__button" type="button" data-open-cookie-settings>Open Cookie Settings</button>\n        </div>\n`;
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

fs.writeFileSync('c:/App/schob.digital/src/DatenschutzEN.tsx', jsx);
