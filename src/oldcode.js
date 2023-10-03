const button = document.getElementById("submit");
const weatherText = document.getElementById("weather");
const tempText = document.getElementById("temp");
const input = document.getElementById("input");
const locationText = document.getElementById("location");
const conditionImage = document.getElementById("condition-img");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  place = await input.value.toString();
  getWeather(place);
});

input.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    place = await input.value.toString();
    getWeather(place);
  }
});

async function getWeather(location) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=ace4d94a1a8c4a129b5160532230504&q=${location.toString()}`,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      let temperature = response.current.temp_f;
      let weatherCondition = response.current.condition.text;
      let currentLocation =
        response.location.name + ", " + response.location.region;
      let imageURL = response.current.condition.icon;
      conditionImage.setAttribute("src", imageURL);
      console.log(weatherCondition);
      weatherText.innerHTML = weatherCondition;
      tempText.innerHTML = temperature + "° F";
      locationText.innerHTML = currentLocation;
    });
}

//https://api.giphy.com/v1/gifs/search?api_key=&q=&limit=1&offset=0&rating=g&lang=en

async function getBG(location) {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=jA5sS50Q0KM1eYINx80GOsQR228XTnOk&q=${location}&limit=1&offset=0&rating=g&lang=en`,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let currentURL = response.data[0].embed_url;
      console.log(currentURL);
      document.body.style.backgroundImage = `url('${currentURL}')`;
    });
}
