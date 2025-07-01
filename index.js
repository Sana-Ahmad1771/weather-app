let placeLocation = document.getElementById("searchcontent");
let btn = document.querySelector("#search-content"); // Make sure this ID exists on the button!
let cityName = document.getElementById("city");
let weatherCondition = document.getElementById("condition");
let temp = document.getElementById("temperature");
let tempIcon = document.getElementById("icon");
let hourlyTim = document.getElementById("hourlyTime");
let hourlyTemp = document.getElementById("hourlyTemp");

placeLocation.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});

btn.addEventListener("click", async () => {
  try {
    // Fetch current weather
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=8b8332649a78433db47113145253006&q=${placeLocation.value}&aqi=no`
    );
    const weatherData = await response.json();

    // Update current weather UI
    cityName.innerText = weatherData.location.name;
    weatherCondition.innerText = `${weatherData.current.condition.text}, ${weatherData.current.temp_c}°C`;
    tempIcon.src = weatherData.current.condition.icon;

    // Fetch forecast
    const forecastResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=8b8332649a78433db47113145253006&q=${placeLocation.value}&hours=24`
    );
    const forecastData = await forecastResponse.json();

    const forecastDay = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=8b8332649a78433db47113145253006&q=${placeLocation.value}&days=7&aqi=no&alerts=no`
    );
    const forecastDays = await forecastDay.json();

    // Get the hourly data for today
    const hourlyData = forecastData.forecast.forecastday[0].hour;

    // Get the Swiper wrapper
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = ""; // Clear previous slides

    // Create a slide for each hour
    hourlyData.forEach((hourObj) => {
      const date = new Date(hourObj.time);
      let hour = date.getHours();
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = (hour % 12 || 12) + " " + ampm;

      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="hourly-forecast-image"><img src="${hourObj.condition.icon}" alt=""></div>
        <div class="hourly-forecast-content">
          <h3>${hour}</h3>
          <p>${hourObj.temp_c}°C</p>
          <span style="font-size:12px;color:#94b2c7">${hourObj.condition.text}</span>
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    // 7-day forecast table update
    const forecastTable = document.querySelector(".forecast-table");
    forecastTable
      .querySelectorAll(".forecast-row:not(.header)")
      .forEach((row) => row.remove());

    forecastDays.forecast.forecastday.forEach((day) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const condition = day.day.condition.text;
      const icon = day.day.condition.icon;
      const high = day.day.maxtemp_c;
      const low = day.day.mintemp_c;

      const row = document.createElement("div");
      row.className = "forecast-row";
      row.innerHTML = `
        <div>${dayName}</div>
        <div><img src="${icon}" alt="" style="vertical-align:middle;width:24px;height:24px;"> <span style="color: #94b2c7;">${condition}</span></div>
        <div><p>${high}°C</p></div>
        <div><p>${low}°C</p></div>
      `;
      forecastTable.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
const swiper = new Swiper(".swiper", {
  slidesPerView: 6, // 6 cards on desktop
  spaceBetween: 16,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
   autoplay: {
   delay: 5000,
 },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.7,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 5.5,
      spaceBetween: 40,
    },
  },
  centeredSlides: false,
  centeredSlidesBounds: false,
});
