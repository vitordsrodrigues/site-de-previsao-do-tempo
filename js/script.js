const apikey="c3827ef11dd047d6dc2d18677d200fc4";
const url="http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia"
//const cityInput = document.querySelector("#City-input");
const cep=document.querySelector('#cep');
const address=document.querySelector('#address');
const bairro=document.querySelector('#bairro');
const cidade=document.querySelector('#City-input');
const message=document.querySelector('#message');



const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#City");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const WeatherIconElement = document.querySelector("#weather-icon");
const coutryElement = document.querySelector("#coutry");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer=document.querySelector("#weather-data");





cep.addEventListener ('focusout',async()=>{
    try {
        const onlyNumbers=/^[0-9]+$/;
        const cepValid=/^[0-9]{8}$/;
    if(!onlyNumbers.test(cep.value)||!cepValid.test(cep.value)){
        throw{cep_error:'cep invalid'};
    }

    const response=await fetch(`https:/viacep.com.br/ws/${cep.value}/json/`);
    if(!response.ok){
        throw await response.json();
    }
    const responseCep=await response.json();
    address.value=responseCep.logradouro;
    bairro.value=responseCep.bairro;
    cidade.value=responseCep.localidade;
    console.log(cidade);
    } catch (error) {
        if(error?.cep_error){
            message.textContent=error.cep_error;
            setTimeout(()=>{
                message.textContent='';
            },5000);
        }
    }
})
const getweatherData=async(city)=>{
    const apiweatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
    const res=await fetch(apiweatherURL)
    const data=await res.json();
    return data
}

const showWeatherData= async(city)=>{
    const data = await getweatherData(city);
    cityElement.innerText=data.name;
    tempElement.innerText=parseInt(data.main.temp);
    console.log(tempElement);
    descElement.innerText=data.weather[0].description;
    WeatherIconElement.setAttribute(
        "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    umidityElement.innerText=`${data.main.humidity}%`;
    windElement.innerText=`${data.wind.speed}Km/h`;
    weatherContainer.classList.remove("hide");
};
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const city=cidade.value;
    showWeatherData(city);
    
});
