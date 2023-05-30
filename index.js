const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    // A linha abaixo armazena a chave de API em uma variável chamada "APIKey".
    const APIKey = '032216670fc6bd961ee95cefbf507ac0';

    // A linha abaixo seleciona o elemento HTML de entrada de texto dentro de um elemento com a classe "search-box" e obtém o valor digitado, armazenando-o na variável "city".
    const city = document.querySelector('.search-box input').value;

    // Verifica se o campo de entrada de texto está vazio e retorna imediatamente se estiver.
    if (city === '')
        return;

        // A linha abaixo faz uma solicitação fetch para a API do OpenWeatherMap, passando a chave de API e a cidade como parâmetros de consulta.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

             // Verifica se o código de resposta da API é '404' (not found).
            if (json.cod === '404') {
                // Configura a altura do elemento "container" para 400px.
                container.style.height = '400px';

                // Oculta o elemento "weatherBox".
                weatherBox.style.display = 'none';

                // Oculta o elemento "weatherDetails".
                weatherDetails.style.display = 'none';

                // Exibe o elemento "error404".
                error404.style.display = 'block';

                 // Adiciona a classe 'fadeIn' ao elemento "error404" para animação.
                error404.classList.add('fadeIn');
                return; // Retorna e encerra a função.
            }

            // Oculta o elemento "error404".
            error404.style.display = 'none';

            // Remove a classe 'fadeIn' do elemento "error404".
            error404.classList.remove('fadeIn');

            // Seleciona os elementos HTML necessários para exibir as informações do clima.
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            //Verificar a propriedade mainm do primeiro obj no array weather do obj json, conforme valor encontrtado do tempo será usado img de acordo com mesmo.
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'image/clear.png';
                    break;

                case 'Rain':
                    image.src = 'image/rain.png';
                    break;

                case 'Snow':
                    image.src = 'image/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'image/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'image/mist.png';
                    break;

                default:
                    image.src = '';
            }


            //conforme as informaçoes obtidas pelo json, atualiza as linhas
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            //Essas linhas ajustam o estilo dos elementos na página relacionados ao clima. weatherBox e weatherDetails têm sua propriedade display definida como vazio, tornando-os visíveis. A classe fadeIn é adicionada a esses elementos para aplicar uma animação. A altura do elemento container é definida como '590px'.
            
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});