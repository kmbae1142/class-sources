const API_KEY = 'KEY'; // API 키를 여기에 입력하세요
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

async function searchWeather(city) {
    try {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}

function showError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}

searchBtn.addEventListener('click', function () {
    const city = cityInput.value.trim();
    if (city) {
        searchWeather(city);
    } else {
        showError('도시명을 입력해주세요.');
    }
});

cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            searchWeather(city);
        } else {
            showError('도시명을 입력해주세요.');
        }
    }
});
