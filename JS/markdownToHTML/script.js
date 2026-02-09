function convertMarkdown() {
  let md = document.getElementById('markdown-input').value;

  // 1) quotes (block)  >>>>  ANTES que inline
  md = md.replace(/^> (.+)$/gm, (m, txt) => {
    // dentro del quote volvemos a procesar inline
    txt = txt
      .replace(/(\*\*|__)(?=\S)(.+?)(?=\S)\1/g, '<strong>$2</strong>')
      .replace(/(\*)(?=\S)(.+?)(?=\S)\1/g,     '<em>$2</em>')
      .replace(/(_)(?=\S)(.+?)(?=\S)\1/g,      '<em>$2</em>');
    return `<blockquote>${txt}</blockquote>`;
  });

  // 2) headings  >>>>  ANTES que inline
  md = md.replace(/^(#{1,3}) (.+)$/gm, (_, hashes, text) => {
    const level = hashes.length;
    // inline dentro del heading
    text = text
      .replace(/(\*\*|__)(?=\S)(.+?)(?=\S)\1/g, '<strong>$2</strong>')
      .replace(/(\*)(?=\S)(.+?)(?=\S)\1/g,     '<em>$2</em>')
      .replace(/(_)(?=\S)(.+?)(?=\S)\1/g,      '<em>$2</em>');
    return `<h${level}>${text}</h${level}>`;
  });

  // 3) images
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

  // 4) links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // 5) inline (resto del texto que no haya sido sustituido ya)
  md = md
    .replace(/(\*\*|__)(?=\S)(.+?)(?=\S)\1/g, '<strong>$2</strong>')
    .replace(/(\*)(?=\S)(.+?)(?=\S)\1/g,     '<em>$2</em>')
    .replace(/(_)(?=\S)(.+?)(?=\S)\1/g,      '<em>$2</em>');

  return md.trim();
}


const mdInput  = document.getElementById('markdown-input');
const htmlOut  = document.getElementById('html-output');
const preview  = document.getElementById('preview');

function update() {
  const html = convertMarkdown();   // tu función ya existe
  htmlOut.textContent = html;       // mostrar código
  preview.innerHTML   = html;       // renderizar
}
mdInput.addEventListener('input', update);
update();   // primera carga