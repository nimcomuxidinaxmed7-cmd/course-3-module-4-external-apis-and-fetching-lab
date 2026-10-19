
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
  try {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();

    alertsDisplay.innerHTML = `<h2>Weather Alerts: ${data.features.length}</h2>`;

    data.features.forEach((feature) => {
      const headline = document.createElement("p");
      headline.textContent = feature.properties.headline;
      alertsDisplay.appendChild(headline);
    });

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
}

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value.trim().toUpperCase();

  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  await fetchWeatherAlerts(state);

  stateInput.value = "";
});
