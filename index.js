const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

const appNode = document.querySelector(".app")


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameCity.value === ""){
        showError("Campo obligatorio");
    }
    
    callApi(nameCity.value)
    
})

function callApi(ciudad){
    const key = "5008df15e10808ac5b974d5011505e50";
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
    fetch(`${baseUrl}q=${ciudad}&appid=${key}`)
    .then((respuesta) => respuesta.json())
    .then(responseJson =>{
        if(responseJson.cod == "404"){
            showError("ciudad no encontrada")
            form.reset();
        }else{
            showWeather(responseJson)
            form.reset();
        }
    console.log(responseJson);
    })

}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max},sys:{country} , weather:[array]}= data;
    const urlImage= `https://openweathermap.org/img/wn/${array.icon}@2x.png`
    console.log(country);
    const tempReal = parseInt(temp-273.15);
    const tempMa = parseInt(temp_max-273.15+1);
    const tempMi = parseInt(temp_min-273.15-1);

    const container = document.createElement("div");
    container.className = "container-temp"

    const title = document.createElement("h3");
    title.textContent = name;

    const ciudad = document.createElement("h4");
    ciudad.textContent = "País: " + country;

    const tempActual = document.createElement("h2");
    tempActual.textContent = tempReal + "°C";

    const tempMax = document.createElement("p");
    tempMax.textContent = "Max: " + tempMa + "°C";

    const tempMin = document.createElement("p");
    tempMin.textContent = "Min: " + tempMi + "°C";

    const image = document.createElement("img");
    image.src = urlImage;

    
    container.append(title,ciudad, tempActual, tempMax,tempMin, image);
    appNode.appendChild(container);


}

function showError(message){
    const contenedorForm = document.querySelector(".weather-content")
    const alert = document.createElement("p");
    alert.classList.add("alert-message");
    alert.innerHTML = message;

    contenedorForm.appendChild(alert)
    setTimeout(()=>{
        alert.remove();
    },3000);

}