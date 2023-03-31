let countriesData = [];
let origemlatitude = 0;
let origemlongitude = 0;
let destinolatitude = 0;
let destinolongitude = 0;

function getCountriesData() {
  fetch('countries.json')
    .then(response => response.json())
    .then(data => {
      countriesData = data.countries;

      const paisOrigem = document.getElementById('pais_origem');
      const paisDestino = document.getElementById('pais_destino');

      countriesData.forEach(country => {
        const optionOrigem = document.createElement('option');
        optionOrigem.value = country.country;
        optionOrigem.textContent = country.country;
        paisOrigem.appendChild(optionOrigem);

        const optionDestino = document.createElement('option');
        optionDestino.value = country.country;
        optionDestino.textContent = country.country;
        paisDestino.appendChild(optionDestino);
      });

      paisOrigem.addEventListener('change', event => {
        const selectedCountry = event.target.value;
        const cidadeOrigem = document.getElementById('cidade_origem');
        cidadeOrigem.innerHTML =
          "<option value=''>Selecione uma cidade</option>";

        const countryData = countriesData.find(
          country => country.country === selectedCountry
        );
        countryData.cities.forEach(city => {
          const option = document.createElement('option');
          option.value = `${city.latitude},${city.longitude}`;
          option.textContent = city.city;
          cidadeOrigem.appendChild(option);
        });
        cidadeOrigem.addEventListener('change', event => {
          const [latitude, longitude] = event.target.value.split(',');
          origemlatitude = latitude;
          origemlongitude = longitude;
        });
      });

      paisDestino.addEventListener('change', event => {
        const selectedCountry = event.target.value;
        const cidadeDestino = document.getElementById('cidade_destino');
        cidadeDestino.innerHTML =
          "<option value=''>Selecione uma cidade</option>";

        const countryData = countriesData.find(
          country => country.country === selectedCountry
        );
        countryData.cities.forEach(city => {
          const option = document.createElement('option');
          option.value = `${city.latitude},${city.longitude}`;
          option.textContent = city.city;
          cidadeDestino.appendChild(option);
        });
        cidadeDestino.addEventListener('change', event => {
          const [latitude, longitude] = event.target.value.split(',');
          destinolatitude = latitude;
          destinolongitude = longitude;
        });
      });
    });
}

window.addEventListener('load', getCountriesData);

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function getDistance(
  originLatitude = parseFloat(origemlatitude),
  originLongitude = parseFloat(origemlongitude),
  destinationLatitude = parseFloat(destinolatitude),
  destinationLongitude = parseFloat(destinolongitude)
) {
  const EARTH_RADIUS = 6_371.07;
  const diffLatitudeRadians = degreesToRadians(
    destinationLatitude - originLatitude
  );
  const diffLongitudeRadians = degreesToRadians(
    destinationLongitude - originLongitude
  );
  const originLatitudeRadians = degreesToRadians(originLatitude);
  const destinationLatitudeRadians = degreesToRadians(destinationLatitude);
  const kmDistance =
    2 *
    EARTH_RADIUS *
    Math.asin(
      Math.sqrt(
        Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians / 2) +
          Math.cos(originLatitudeRadians) *
            Math.cos(destinationLatitudeRadians) *
            Math.sin(diffLongitudeRadians / 2) *
            Math.sin(diffLongitudeRadians / 2)
      )
    );
  console.log(kmDistance);
  return kmDistance;
}

function calcularPrecoPassagem() {
  const distanciaViagem = getDistance();
  const selectedCountryOrigin = document.getElementById('pais_origem').value;
  const selectedCountryDestination =
    document.getElementById('pais_destino').value;
  const selectedClass = document.querySelector(
    'input[name="classe"]:checked'
  ).value;
  const milhasUsed = document.getElementById('milhas').value;
  const criancas = document.getElementById('criancas').value;
  const adultos = document.getElementById('adultos').value;

  let precoAdulto;
  let precoCrianca;

  if (selectedCountryOrigin === selectedCountryDestination) {
    precoAdulto = distanciaViagem * 0.3 * adultos;
    precoCrianca = distanciaViagem * 0.15 * criancas;
  } else {
    precoAdulto = distanciaViagem * 0.5 * adultos;
    precoCrianca = distanciaViagem * 0.25 * criancas;
  }

  if (selectedClass === 'executiva') {
    precoAdulto *= 1.8;
    precoCrianca *= 1.4;
  }

  const milhasValue = parseFloat(milhasUsed);
  if (milhasValue > 0) {
    const descontoMilhas = milhasValue * 0.02;
    precoAdulto -= descontoMilhas;
    precoCrianca -= descontoMilhas;
  }

  const precoTotal = precoAdulto + precoCrianca;
  const precoPassagem = document.getElementById('preco_passagem');
  precoPassagem.innerHTML = `Adultos: R$ ${precoAdulto.toFixed(
    2
  )}, Crianças: R$ ${precoCrianca.toFixed(2)}, Total: R$ ${precoTotal.toFixed(
    2
  )}`;
  console.log(precoTotal);
}
