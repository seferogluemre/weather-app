const form = document.getElementById("form");
const input = document.getElementById("cityInputValue");
const cityRowList = document.getElementById("ajax-section");
const message = document.getElementById("msg");

const apıKey = "ca289ef8be4db0b41bda25fdcf4b6232";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = input.value;

  const listİtems = document.querySelectorAll(".ajax-section .card");
  const listİtemsArray = Array.from(listİtems);

  if (listİtemsArray > 0) {
    const filteredArray = listİtemsArray.filter((eleman) => {
      let content = document
        .querySelectorAll(".card span")
        .textContent.toLowerCase();
      return content == inputValue.toLowerCase();
    });

    if (filteredArray.length > 0) {
      message.textContent = `Zaten ${
        filteredArray[0].querySelectorAll(".card span").textContent
      }
             Şehrinin Hava durumunu biliyorsun`;
    }
    form.reset();
    input.focus();
    return;
  }
});
async function weatherCityFetchData(value) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=41.0082&lon=28.9784&appid=${apıKey}`
  );
  try {
    const data = await response.json();
    console.log(data);
    const { main, weather, name, sys } = data;
    const ıcon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

    cityRowList.innerHTML = `
        <div class="col-lg-4 col-sm-6 col-md-4">
            <div class="card" data-name=${name},${sys.country}>
              <img src="${ıcon}" class="card-img-top" alt="${
      weather[0]["description"]
    }" />
              <div class="card-body">
                <span class="card-title">${name}</span>
                <span class="card-text">
                  ${sys.country}
                </span>
                <span class="card-text">${Math.round(main.temp)}</span>
                <span class="card-text">${weather[0]["description"]}</span>
              </div>
            </div>
          </div>
    `;
  } catch (error) {
    message.textContent = "Lütfen geçerli bir şehir ara";
  }

  message.textContent = "";
  form.reset();
  input.focus();
}
