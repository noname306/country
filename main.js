const userForm = document.querySelector("#form");
const userInput = document.querySelector("#input");
const userBox = document.querySelector(".wrapper");

const countryAll = "https://restcountries.com/v3.1/all";
const countrySearch = "https://restcountries.com/v3.1/name/";

async function renderCountries(ApiUrl) {
    userBox.innerHTML = "";
    try {
        const response = await fetch(ApiUrl);
        
        if (!response.ok) { 
            throw new Error("Country not found");
        }

        const data = await response.json();
        
        if (data.length === 0) { 
            throw new Error("Country not found");
        }

        data.forEach(country => {
            userBox.innerHTML += `
                <div class="card bg-base-100 w-96 shadow-sm mt-[50px]">
                    <figure>
                      <img class="rasm h-[200px] w-full" 
                        src="${country.flags.png}"
                        alt="${country.name.common}" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${country.name.common}</h2>
                      <p class="text">${country.name.official}</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">More</button>
                      </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        alert("Not found");
        renderCountries(countryAll);
    }
}

renderCountries(countryAll);

userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = userInput.value.trim();
    if (inputValue) {
        renderCountries(`${countrySearch}${inputValue}`);
        userInput.value = "";
    } else {
        alert("Not found");
        renderCountries(countryAll);
    }
});
