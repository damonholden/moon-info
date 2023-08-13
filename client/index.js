const moonDataResponse = await fetch('/moon');
const moonDataJson = await moonDataResponse.json();

console.log(moonDataJson);

let list = '';

for (const data of Object.entries(moonDataJson)) {
  list += `<li>${data[0].replace(/_/g, ' ')}: ${data[1]}</li>`;
}

document.getElementById('moon-data').innerHTML = list;
