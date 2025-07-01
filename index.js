let placeLocation = document.getElementById("searchcontent");
let btn = document.querySelector("#search-content"); // Make sure this ID exists on the button!
let cityName =document.getElementById("city")
let weatherCondition = document.getElementById("condition")
let temp=document.getElementById("temperature")
let tempIcon=document.getElementById("icon")
btn.addEventListener("click", async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=8b8332649a78433db47113145253006&q=${placeLocation.value}&aqi=no`
    );
    const weatherData = await response.json();

    console.log(weatherData, "weatherData");

    const city = weatherData.location.name;
    cityName.innerText = city;

     const condition= weatherData.current.condition.text;
     const temperature= weatherData.current.temp_c;

    weatherCondition.innerText= `${condition}, ${temperature}°C` ;

    const icon= weatherData.current.condition.icon;
    tempIcon.src=icon;

    console.log(city, "City from event listener");
    console.log(weatherData.current.temp_c,"tempeatere")
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

const swiper = new Swiper('.swiper', {
  slidesPerView: 6, // 6 cards on desktop
  spaceBetween: 16,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
 breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
    }},
  centeredSlides: true,
  centeredSlidesBounds: false,
});

   // const condition= weatherData.current.condition.text;
    // weatherCondition.innerText = condition;
    
    // const temperature= weatherData.current.temp_c;
    // temp.innerText= temperature;