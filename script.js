const form = document.getElementById("form");
const input = document.getElementById("cityInputValue");
const cityRowList = document.getElementById("ajax-section");
const message = document.getElementById("msg");

const apiKey = "ca289ef8be4db0b41bda25fdcf4b6232";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = input.value;

  const listItems = document.querySelectorAll(".ajax-section .card");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((eleman) => {
      let content = eleman
        .querySelector(".card-title")
        .textContent.toLowerCase();
      return content === inputValue.toLowerCase();
    });

    if (filteredArray.length > 0) {
      message.textContent = `Zaten ${
        filteredArray[0].querySelector(".card-title").textContent
      } şehrinin hava durumunu biliyorsun.`;
      form.reset();
      input.focus();
      return;
    }
  }

  weatherCityFetchData(inputValue);
});

async function weatherCityFetchData(value) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric`
  );
  try {
    const data = await response.json();
    console.log(data);
    const { main, weather, name, sys } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

    cityRowList.innerHTML += `
        <div class="col-lg-4 col-sm-6 col-md-4">
            <div class="card" data-name="${name},${sys.country}">
              <img src="${icon}" class="card-img-top" alt="${
      weather[0]["description"]
    }" />
              <div class="card-body">
                <span class="card-title">${name}</span>
                <span class="card-text">${sys.country}</span>
                <span class="card-text">${Math.round(main.temp)}°C</span>
                <span class="card-text">${weather[0]["description"]}</span>
              </div>
            </div>
        </div>
    `;
  } catch (error) {
    message.textContent = "Lütfen geçerli bir şehir adı giriniz.";
  }

  message.textContent = "";
  form.reset();
  input.focus();
}
