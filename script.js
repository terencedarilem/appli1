// Clé d'API OpenWeatherMap (remplacez par votre propre clé)
const apiKey = '3942cbb89a13fe484a20471fa24fc0c5';

// Fonction pour récupérer les données météorologiques à partir de l'API OpenWeatherMap
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Affichage des données météorologiques dans la console
        console.log(data);

        // Mise à jour du contenu HTML avec les données météorologiques
        document.getElementById('temperature').textContent = data.main.temp + ' °C';
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('location').textContent = data.name + ', ' + data.sys.country;

        // Appel de la fonction pour afficher l'icône météorologique appropriée avec sa couleur
        displayWeatherIcon(data.weather[0].main);
        
        // Appel de la fonction pour changer le fond d'écran en fonction du pays et du temps
        changeBackground(data.sys.country, data.weather[0].main);
    } catch (error) {
        console.log('Erreur de récupération des données météorologiques:', error.message);
    }
}

// Fonction pour afficher l'icône météorologique appropriée avec sa couleur
function displayWeatherIcon(weatherCondition) {
    const iconElement = document.getElementById('weather-icon');
    let iconClass = '';
    let iconColorClass = '';

    // Choisissez la classe d'icône et la classe de couleur en fonction de la condition météorologique
    switch (weatherCondition) {
        case 'Clear':
            iconClass = 'fas fa-sun'; // Soleil
            iconColorClass = 'sun-icon';
            break;
        case 'Clouds':
            iconClass = 'fas fa-cloud'; // Nuages
            iconColorClass = 'cloud-icon';
            break;
        case 'Rain':
            iconClass = 'fas fa-cloud-showers-heavy'; // Pluie
            iconColorClass = 'rain-icon';
            break;
        case 'Snow':
            iconClass = 'fas fa-snowflake'; // Neige
            iconColorClass = 'snow-icon';
            break;
        case 'Wind':
            iconClass = 'fas fa-wind'; // Vent
            iconColorClass = 'wind-icon';
            break;
        case 'Star':
            iconClass = 'fas fa-star'; // Étoile
            iconColorClass = 'star-icon';
            break;
        case 'Moon':
            iconClass = 'fas fa-moon'; // Lune
            iconColorClass = 'moon-icon';
            break;
        default:
            iconClass = 'fas fa-question-circle'; // Icône par défaut en cas de condition inconnue
            iconColorClass = 'default-icon';
    }

    // Ajouter la classe d'icône et la classe de couleur à l'élément d'icône
    iconElement.className = `${iconClass} ${iconColorClass}`;
}

// Fonction pour changer le fond d'écran en fonction du pays et du temps
function changeBackground(country, weatherCondition) {
    const bodyElement = document.body;
    let backgroundUrl = '';

    // Déterminez l'image de fond en fonction du pays et de la condition météorologique
    switch (country) {
        case 'FR':
            if (weatherCondition === 'Clear') {
                backgroundUrl = 'url("images/france-sunny.jpg")';
            } else if (weatherCondition === 'Rain') {
                backgroundUrl = 'url("images/france-rainy.jpg")';
            } else {
                backgroundUrl = 'url("images/france-default.jpg")';
            }
            break;
        case 'US':
            // Ajoutez des cas pour d'autres pays si nécessaire
            break;
        default:
            backgroundUrl = 'url("images/default-background.jpg")';
    }

    // Changer l'image de fond du body
    bodyElement.style.backgroundImage = backgroundUrl;
}

// Fonction pour rechercher les données météorologiques en fonction de la ville saisie
function searchWeather() {
    const cityInput = document.getElementById('city-input').value;
    getWeather(cityInput);
}