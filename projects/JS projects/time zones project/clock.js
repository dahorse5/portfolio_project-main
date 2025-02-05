document.addEventListener("DOMContentLoaded", () => {
    const countries = [
        { name: "Israel", timeZone: "Asia/Jerusalem", flag: "./images/Flag_of_Israel.svg.png", region: "Asia", capital: "Jerusalem" },
        { name: "United Kingdom", timeZone: "Europe/London", flag: "./images/Flag_of_the_United_Kingdom.svg.png", region: "Europe", capital: "London" },
        { name: "France", timeZone: "Europe/Paris", flag: "./images/franceFlag.png", region: "Europe", capital: "Paris" },
        { name: "New York (USA)", timeZone: "America/New_York", flag: "./images/Flag_of_the_United_States.png", region: "North America", capital: "Washington D.C." },
        { name: "Japan", timeZone: "Asia/Tokyo", flag: "./images/japanFlag.png", region: "Asia", capital: "Tokyo" },
        { name: "Brazil", timeZone: "America/Sao_Paulo", flag: "./images/brazilFlag.png", region: "South America", capital: "Brasília" },
        { name: "India", timeZone: "Asia/Kolkata", flag: "./images/indiaFlag.png", region: "Asia", capital: "New Delhi" },
        { name: "Australia", timeZone: "Australia/Sydney", flag: "./images/australiaFlag.png", region: "Oceania", capital: "Canberra" },
        { name: "Russia", timeZone: "Europe/Moscow", flag: "./images/russiaFlag.png", region: "Europe/Asia", capital: "Moscow" },
        { name: "South Africa", timeZone: "Africa/Johannesburg", flag: "./images/southAfricaFlag.png", region: "Africa", capital: "Pretoria" },
        { name: "Germany", timeZone: "Europe/Berlin", flag: "./images/germanyFlag.png", region: "Europe", capital: "Berlin" },
        { name: "Canada", timeZone: "America/Toronto", flag: "./images/canadaFlag.png", region: "North America", capital: "Ottawa" },
    ];

    const clocksContainer = document.getElementById("clocksContainer");

    // Create all cards
    countries.forEach(({ name, flag, timeZone, region, capital }) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${flag}" alt="Flag of ${name}">
                    <h1>${name}</h1>
                    <h2 id="time-${name.replace(/\s+/g, '-')}">--:--:--</h2>
                </div>
                <div class="card-back">
                    <h3>${name}</h3>
                    <p>Region: ${region}</p>
                    <p>Capital: ${capital}</p>
                </div>
            </div>
        `;

        clocksContainer.appendChild(cardElement);
    });

    // Update time for each country
    function updateClocks() {
        countries.forEach(({ name, timeZone }) => {
            const timeElement = document.getElementById(`time-${name.replace(/\s+/g, '-')}`);
            const currentTime = new Date().toLocaleTimeString("en-US", { timeZone });
            timeElement.textContent = currentTime;
        });
    }

    updateClocks(); // Initial call
    setInterval(updateClocks, 1000); // Update every second
});
