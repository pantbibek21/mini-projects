const btn = document.querySelector(".btn");
const countryCard = document.querySelector(".country-card");
const msg = document.querySelector(".message");

const insertHTMLtemplate = function (dataObj) {
    const NepalObj = dataObj[0];
    const htmlTemplate = `<div class="country-card">
    <div class="flag"><img src="${NepalObj.flags.svg}"></div>
    <div class="country-info">
        <p><span class="label">Name</span>: ${NepalObj.name.common}</p>
        <p><span class="label">Capital</span>: ${NepalObj.capital[0]}</p>
        <p><span class="label">Currency</span>: ${NepalObj.currencies.NPR.name}</p>
        <p><span class="label">Population</span>: ${(NepalObj.population/1000000).toFixed(2)} M</p>
    </div>
    </div>`;

    btn.insertAdjacentHTML("afterend", htmlTemplate);
    btn.disabled = true;
}

// 1. Get the location co ordinate
// 2. Do reverse geocoding
// 3. Fetch the country data after reverse geocoding


const locationTracker = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const getLocation = function () {
    let city = "", country = "";
    locationTracker().then(position => {
       
        const { latitude, longitude } = position.coords;
        return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
    })
        .then(response => response.json())
        .then(data => {
            city = data.city;
            country = data.countryName;
            const { countryName } = data;
            return fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        })
        .then(response => response.json())
        .then(countryData => {
            msg.innerHTML = `Hello user, you are currently in <span class="location">${city}, ${country}</span>`;
            insertHTMLtemplate(countryData);})
        .catch(err => {console.log(err.message);
        msg.innerHTML = `Hey user, an error occured : <span class="location">${err.message}😥<span>`});

}

btn.addEventListener("click", getLocation);