$(document).ready(function(){
    
    loadNews("lviv");
    loadRecipes("shredded%20chicken");
    loadWeather("Lviv","ua");
    topFunction();

    function convertTime(unixtime) {
        return(new Date(unixtime * 1000));
    }
    
    function windDirection(degrees) {
        switch (true) {
            case (degrees < 23):
                return("North");
                break;
            case (degrees < 68):
                return("North East");
                break;
            case (degrees < 123):
                return("East");
                break;
            case (degrees < 158):
                return("South East");
                break;
            case (degrees < 203):
                return("South");
                break;
            case (degrees < 248):
                return("South West");
                break;
            case (degrees < 293):
                return("West");
                break;
            case (degrees < 338):
                return("North West");
                break;
            default:
                return("North");
                break;
        }
    }
    
    function loadWeather(city,country) {
        $.ajax({url: "https://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&units=metric&appid=3ee9511c9b67d9816a5ebb17415a2ceb", success: function(result){
            if (result) {
                $(".weather-widget__img").attr("src","https://openweathermap.org/img/w/"+result.weather[0].icon+".png");
                $(".weather-widget__temperature").append(result.main.temp+"°C");
                $(".weather-widget__main").append(result.weather[0].description);
                $("#wind-speed").append(result.wind.speed + " m/s, ");
                $("#wind-direction").append(windDirection(result.wind.deg) + " ("+result.wind.deg+"°)");
                $("#weather-widget__cloudiness").append(result.clouds.all);
                $("#weather-widget-pressure").append(result.main.pressure + " hpa");
                $("#humidity").append(result.main.humidity + " %");
                $("#sunrise").append(convertTime(result.sys.sunrise).toLocaleString('en-US'));
                $("#sunset").append(convertTime(result.sys.sunset).toLocaleString('en-US'));
            }
        }});   
    }         
    
    function addItem(selector, url, title, img_url, desc) {
        $(selector).append(
           "<article class='news-item col-12 col-sm-6 col-lg-4'><a href='"+url+"'><h3>" + title + "</h3>"+
            "<img src=\"" + img_url + "\" /><p>" + desc + "</p></a></article>"
        );
    }
    
    function loadNews(about) {
        $.ajax({url: "https://newsapi.org/v2/everything?q=" + about + "&language=en&from=2018-08-01&apiKey=c82dd1db265e4e06a92deefffcf65c71", success: function(result){
            if (result.status == "ok") {
                for (let i = 0; i < result.articles.length; i++) {
                let item = result.articles[i];
                addItem("#news-list", item.url, item.title, item.urlToImage, item.description);
                }
            }
        }});
    }
    
    
    function loadRecipes(about) {
        $.ajax({url: "https://food2fork.com/api/search?key=94d213211ca9519693f21abf7ff525d0&q=" + about, success: function(result){
            let json = JSON.parse(result);
            for (let i = 0; i < json.recipes.length; i++) {
                let item = json.recipes[i];
                addItem("#recipes-list", item.source_url, item.title, item.image_url, "Rating: " + item.social_rank);
            }
        }});
    }
    
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
});

      