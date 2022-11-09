const container = document.querySelector(".container");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
submitBtn.addEventListener("click", getCountryName);

function getCountryName() {
    let country = document.querySelector(".input-country").value;

    if (! /^[a-zA-Z ]+$/.test(country)) {
        console.log("Invalid Country Name");
    }
    else {
        let updatedCountryName = formattedCountryName(country);
        container.innerHTML = "";
        renderCountryWithName(updatedCountryName);
    }
}

function renderCountryWithName(name) {
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

function renderCountryWithCode(code) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/alpha/${code}`);
    request.send();

    request.addEventListener("load", function () {
        const [dataObj] = JSON.parse(this.responseText);
        renderCountryCard(dataObj, "neighbouring-country", false);
    })
}
function renderCountryCard(data, className = "", countryCodeAccept = true) {

    const [currency, currencyObj] = Object.entries(data.currencies)[0];
    console.log(currencyObj["name"]);
    const countryhtmlComponent = `<div class="country-container ${className}">
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

    if (countryCodeAccept) {
        const borders = data.borders;
        if (borders.length != 0) {
            borders.forEach((border) => {
                renderCountryWithCode(border);
            })
        }
    }
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

document.onkeydown = (e) => {
    if (e.key == 'Enter') {
        getCountryName();
    }
}

clearBtn.addEventListener("click",()=>{
    document.querySelector(".input-country").value = "";
    container.innerHTML = "";
})