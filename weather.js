async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '36454e3a0498fa4d928b2174262a1359'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherData = document.getElementById('weatherData');

        if (data.cod === 200) {
            const { main, weather } = data;
            const { temp } = main;
            const { description, main: weatherMain } = weather[0];

            let weatherEmoji = '';
            if (weatherMain === 'Clear') {
                weatherEmoji = '☀️';
            } else if (weatherMain === 'Clouds') {
                weatherEmoji = '☁️';
            } else if (weatherMain === 'Rain') {
                weatherEmoji = '🌧️';
            } else if (weatherMain === 'Snow') {
                weatherEmoji = '❄️';
            } else if (weatherMain === 'Haze' || weatherMain === 'Mist' || weatherMain === 'Fog') {
                weatherEmoji = '🌫️';
            } else if (weatherMain === 'Thunderstorm') {
                weatherEmoji = '⛈️';
            } else {
                weatherEmoji = '❓';
            }

            const currentDate = new Date().toDateString();
            const currentTime = new Date().toLocaleTimeString();

            weatherData.innerHTML = `
                <h3>Weather in ${city}</h3> 
                <p>${weatherEmoji} ${description}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Date: ${currentDate}</p>
                <p>Time: ${currentTime}</p>
                
            `;

            if (weatherMain === 'Clear') {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1623846736569-1d90cba76d65?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Replace with your own image URL
            } else if (weatherMain === 'Clouds') {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1463947628408-f8581a2f4aca?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Replace with your own image URL
            } else if (weatherMain === 'Rain' || weatherMain === 'Thunderstorm') {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Replace with your own image URL
            } else if (weatherMain === 'Snow') {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Replace with your own image URL
            } else {
                document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?weather')"; // Replace with your own image URL
            }
        } else if (data.cod === '404') {
            weatherData.innerHTML = `<p>City not found</p>`;
        } else {
            weatherData.innerHTML = `<p>Weather information not available</p>`;
        }
    } catch (error) {
        console.error('Error fetching data', error);
    }
}