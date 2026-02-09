const iconEl   = document.getElementById('weather-icon');
const locEl    = document.getElementById('location');
const tempEl   = document.getElementById('main-temperature');
const feelsEl  = document.getElementById('feels-like');
const humEl    = document.getElementById('humidity');
const windEl   = document.getElementById('wind');
const gustEl   = document.getElementById('wind-gust');
const mainEl   = document.getElementById('weather-main');
const selectEl = document.getElementById('city-select');
const btnEl    = document.getElementById('get-weather-btn');
const boxEl    = document.getElementById('weather-info');

async function getWeather(city) {
  try {
    const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

function safe(val) {
  return val ?? 'N/A';
}

async function showWeather(city) {
  const data = await getWeather(city);
  if (!data) return alert('Something went wrong, please try again later.');

  boxEl.style.display = 'block';
  iconEl.src   = safe(data.weather?.[0]?.icon);
  locEl.textContent     = `Location: ${safe(data.name)}`;
  tempEl.textContent    = `Temperature: ${safe(data.main?.temp)} °C`;
  feelsEl.textContent   = `Feels like: ${safe(data.main?.feels_like)} °C`;
  humEl.textContent     = `Humidity: ${safe(data.main?.humidity)} %`;
  windEl.textContent    = `Wind: ${safe(data.wind?.speed)} m/s`;
  gustEl.textContent    = `Wind gust: ${safe(data.wind?.gust)} m/s`;
  mainEl.textContent    = `Weather: ${safe(data.weather?.[0]?.main)}`;
}

btnEl.addEventListener('click', () => {
  const city = selectEl.value;
  if (!city) return;
  showWeather(city);
});