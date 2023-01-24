// https://api.openweathermap.org/data/2.5/weather?q=new%20york&units=metric&APPID=43a2897bfcf9a831867c8d3ec4f8de7b
const weather = {
    apiKey: "43a2897bfcf9a831867c8d3ec4f8de7b",
    date: function () {
        const todayDate = new Date();

        const currentDate = todayDate.getDate();
        const currentYear = todayDate.getFullYear();

        let currentDay = todayDate.getDay();
        switch (currentDay) {
            case 1:
                currentDay = "Monday";
                break;
            case 2:
                currentDay = "Tuesday";
                break;
            case 3:
                currentDay = "Wednesday";
                break;
            case 4:
                currentDay = "Thursday";
                break;
            case 5:
                currentDay = "Friday";
                break;
            case 6:
                currentDay = "Saturday";
                break;
            case 7:
                currentDay = "Sunday";
                break;
        }

        let currentMonth = todayDate.getMonth();
        switch (currentMonth) {
            case 0:
                currentMonth = "January";
                break;
            case 1:
                currentMonth = "February";
                break;
            case 2:
                currentMonth = "March";
                break;
            case 3:
                currentMonth = "April";
                break;
            case 4:
                currentMonth = "May";
                break;
            case 5:
                currentMonth = "June";
                break;
            case 6:
                currentMonth = "July";
                break;
            case 7:
                currentMonth = "August";
                break;
            case 8:
                currentMonth = "September";
                break;
            case 9:
                currentMonth = "October";
                break;
            case 10:
                currentMonth = "November";
                break;
            case 11:
                currentMonth = "December";
                break;
        }

        return `${currentDay} ${currentDate} ${currentMonth} ${currentYear}`;
    },
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`)
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min, temp_max, humidity } = data.main;
        document.querySelector(".city").innerText = name;
        document.querySelector(".date").innerText = this.date();
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${Math.trunc(temp)}°C`;
        document.querySelector(".min").innerText = `${Math.trunc(temp_min)}°C`;
        document.querySelector(".max").innerText = `${Math.trunc(temp_max)}°C`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
        document.querySelector(".weather").classList.remove("loading");
    },
    searchWeather: function () {
        this.fetchWeather(document.querySelector(".search").value);
        document.querySelector(".search").value = "";
    }
}

document.querySelector(".search-btn").addEventListener("click", function() {
    weather.searchWeather();
});

document.querySelector(".search").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.searchWeather();
    }
});

window.onload = weather.fetchWeather("New Delhi");