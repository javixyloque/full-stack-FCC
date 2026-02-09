// const m = new Map();

// m.set('clave', valor);     // guarda
// m.get('clave');            // devuelve valor
// m.has('clave');            // true / false
// m.delete('clave');         // borra
// m.keys()                   // iterador con las claves

// 1. Inicializas el Map
const poll = new Map();

// 2. Añadir opción
function addOption(option) {
  if (!option) return 'Option cannot be empty.';
  if (poll.has(option)) return `Option "${option}" already exists.`;
  poll.set(option, new Set());          // Set vacío para votantes
  return `Option "${option}" added to the poll.`;
}

// 3. Votar
function vote(option, voterId) {
  if (!poll.has(option)) return `Option "${option}" does not exist.`;
  const voters = poll.get(option);
  if (voters.has(voterId))
    return `Voter ${voterId} has already voted for "${option}".`;
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// 4. Mostrar resultados
function displayResults() {
  let out = 'Poll Results:\n';
  for (const [opt, set] of poll) {
    out += `${opt}: ${set.size} votes\n`;
  }
  return out.trimEnd();
}

/* 5. Relleno rápido para cumplir requisitos */
['Pizza', 'Tacos', 'Burger'].forEach(addOption);
vote('Pizza', ' Ana');
vote('Tacos', 'Luis');
vote('Pizza', 'Carlos');