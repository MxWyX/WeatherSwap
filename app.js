const api = "0e38315cd5912c12807ec256fec8451a";

document.querySelector("button").addEventListener("click", (event) => {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  document.querySelector("#city").value = "";
  swapCoords(city);
});

const swapCoords = (city) => {
  let url = fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api}`
  ).then((resp) => {
    resp
      .json()
      .then((json) => {
        if (json[0].lon < 0) {
          getWeather([-json[0].lat, 180 + json[0].lon], city);
        } else {
          getWeather([-json[0].lat, 180 - json[0].lon], city);
        }
      })
      .catch((err) => {
        document.querySelector(
          "#weather"
        ).textContent = `We couldn't find that location to get the temperature opposite...`;
      });
  });
};

const getWeather = (coords, city) => {
  console.log(coords);
  let location = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${api}`
  ).then((resp) => {
    resp.json().then((json) => {
      document.querySelector(
        "#weather"
      ).textContent = `The temperature on the opposite side of the globe from ${city} is ${(
        json.main.temp - 273.15
      ).toFixed(2)} degrees celcius.`;
    });
  });
};
