const apiKey = "d44a7a1371cace8bcfd668b52f9c1896";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
	let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

	if (response.status == 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else {
		let data = await response.json();

		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML =
			Math.round(data.main.temp) + "°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + "km / h";

		if (data.weather[0].main == "Clouds") {
			weatherIcon.src = "./img/clouds.png";
		} else if (data.weather[0].main == "Drizzle") {
			weatherIcon.src = "./img/drizzle.png";
		} else if (data.weather[0].main == "Humidity") {
			weatherIcon.src = "./img/humidity.png";
		} else if (data.weather[0].main == "Mist") {
			weatherIcon.src = "./img/mist.png";
		} else if (data.weather[0].main == "Rain") {
			weatherIcon.src = "./img/Rain.png";
		} else if (data.weather[0].main == "Snow") {
			weatherIcon.src = "./img/snow.png";
		} else if (data.weather[0].main == "Wind") {
			weatherIcon.src = "./img/wind.png";
		}

		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	}

	console.log(data);
}

searchBtn.addEventListener("click", () => {
	checkWeather(searchBox.value);
	searchBox.value = "";
	searchBox.focus();
});
