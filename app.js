const container = document.querySelector( '.container' );
const search = document.querySelector( '.search-box button' );
const weatherBox = document.querySelector( '.weather-box' );
const weatherDetails = document.querySelector( '.weather-details' );
const error404 = document.querySelector( '.not-found' );

const image = document.querySelector( '.weather-box img' );
const temperature = document.querySelector( '.weather-box .temperature' );
const description = document.querySelector( '.weather-box .description' );
const humidity = document.querySelector( '.weather-details .humidity span' );
const wind = document.querySelector( '.weather-details .wind span' );

const storageInput = document.querySelector( '.storage' );
const favoriteBtn = document.querySelector( '#favorite-btn' );
const storedLocation = localStorage.getItem( 'weatherLocation' );
console.log( storageInput )

// Get appropriate icon
const getIcon = weather => {
    switch ( weather ) {
        case 'Clear':
            return 'images/clear.png';
        case 'Rain':
        case 'Drizzle':
            return 'images/rain.png';
        case 'Snow':
            return 'images/snow.png';
        case 'Clouds':
            return 'images/cloud.png';
        case 'Haze':
        case 'Mist':
            return 'images/mist.png';
        default:
            return '';
    }
}

// Fetch location weather
const fetchWeather = async ( weatherApiUrl ) => {
    const response = await fetch( weatherApiUrl );
    const locationWeather = await response.json();

    return locationWeather;
}

search.addEventListener( 'click', async () => {
    const apiKey = 'e7786d307582fc074893def0f1b1d854';
    const city = document.querySelector( '.search-box input' ).value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&units=metric&appid=${ apiKey }`;

    let locationWeather = await fetchWeather( apiUrl );

    if ( storedLocation === null || !city.includes( locationWeather.name ) ) {
        localStorage.setItem( 'weatherLocation', JSON.stringify( locationWeather ) )
        localStorage.setItem( 'city', city );
    }
    else {
        locationWeather = JSON.parse( storedLocation );
    }

    if ( locationWeather.cod === '404' || city === '' ) {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add( 'fadeIn' );
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove( 'fadeIn' );

    image.src = getIcon( locationWeather.weather[ 0 ].main );
    temperature.innerHTML = `${ Math.round( locationWeather.main.temp ) }<span>°C</span>`;
    description.innerHTML = `${ locationWeather.weather[ 0 ].description }`;
    humidity.innerHTML = `${ locationWeather.main.humidity }%`;
    wind.innerHTML = `${ parseInt( locationWeather.wind.speed ) }Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add( 'fadeIn' );
    weatherDetails.classList.add( 'fadeIn' );
    container.style.height = '37rem';
} );

document.addEventListener( 'DOMContentLoaded', () => {
    if ( storedLocation !== null || !storedLocation.includes( '400' ) ) {
        search.click();
    }

    storageInput.addEventListener( 'change', () => localStorage.removeItem( 'weatherlocation' ) );
} );