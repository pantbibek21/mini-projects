const container = document.querySelector(".container");
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", function () {
    let country = document.querySelector(".input-country").value;

    if (! /^[a-zA-Z ]+$/.test(country)) {
        console.log("Invalid Country Name");
    }
    else {
        let updatedCountryName = formattedCountryName(country);
        renderCountry(updatedCountryName);
    }
});

function renderCountry(name) {
    //ajax call

    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${name}`);
    request.send();

    request.addEventListener("load", function () {

        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountryCard(data);
    })


}
function renderCountryCard(data) {

    const [currency, currencyObj] = Object.entries(data.currencies)[0];
    console.log(currencyObj["name"]);
    const countryhtmlComponent = `<div class="country-container">
    <div class="flag"><img src="${data.flags.svg}"></div>
    <div class="country-info">
        <p><span class="label">Name</span> : ${data.name.common}</p>
        <p><span class="label">Capital</span> : ${data.capital[0]}</p>
       <p><span class="label">Continent</span> : ${data.region}</p>
        <p><span class="label">Currency</span>: ${currency} - ${currencyObj["name"]}</p>
        <p><span class="label">Population</span> : ${(data.population / 1000000).toFixed(1)} M</p>
    </div>
</div>`;
    container.insertAdjacentHTML("beforeend", countryhtmlComponent);
}

function formattedCountryName(country) {
    let countryWordArr = country.split(" ").filter((ele) => {
        return ele != "";
    });

    let countryWordFormatted = countryWordArr.map((ele) => {
        const formattedWord = ele.split("")[0].toUpperCase() + ele.slice(1);
        return formattedWord;
    })

    country = countryWordFormatted.join(" ");
    return country;
}

const obj = {
    name: "Bibek Pant"
}
console.log(Object.values(obj)[0]);
