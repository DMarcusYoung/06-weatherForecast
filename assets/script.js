// Ensures HTML loads before any of the code runs
$(document).ready(function(){
    // Getting HTML elements via JQuery, cities variable will store the searched cities
    const $city = $(".city");
    const $temp = $(".temp");
    const $humidity = $(".humidity");
    const $wind = $(".wind");
    const $uv = $(".uv");
    let cities = [];

    // Loads in cities if they have been called before
    if (localStorage.getItem("cities") != undefined){
        cities = JSON.parse(localStorage.getItem("cities"));
        for(let i in cities){
            const $cityMenu = $("<li>");
            $cityMenu.addClass("list-group-item").text(cities[i]);
            $('.list-group').append($cityMenu);
        }
    }
    
    // Search button event listener
    $(document).on('click', ".searchBtn", function(){
        // Gets search value and creates element for each search
        const $citySearch = $(".citySearch").val();
        const $cityMenu = $("<li>");
        // API url depending on the city
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + $citySearch + "&units=imperial&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
        
        // First ajax call is for all of the main weather data
        $.ajax({
            url,
            method: "GET"
        }).then(function(response){
            // Second API call just for UV index
            let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon +"&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(response2){
                // Gets the date and puts it in a readable format
                var date = new Date(response.dt * 1000).toDateString();
                // Puts the name of the city on the menu and saves to local storage
                $cityMenu.addClass("list-group-item").text(response.name);
                $('.list-group').append($cityMenu);
                if (localStorage.getItem("cities") != undefined){
                    cities = JSON.parse(localStorage.getItem("cities"));
                }
                cities.push(response.name);
                cities = JSON.stringify(cities);
                localStorage.setItem("cities", cities);
                // Displays all of the data on the screen
                $city.text(`${response.name} (${date})`);
                $temp.text(`${response.main.temp} °F`);
                $humidity.text(`${response.main.humidity}%`);
                $wind.text(`${response.wind.speed} MPH`);
                $uv.text(response2.value);
            })
        })
    })
    // Event listener for the city menu
    $(document).on('click', ".list-group-item", function(){
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + $(this).text() + "&units=imperial&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
        // Same API calls as before only it doesn't create a new menu item or save to local storage
        $.ajax({
            url,
            method: "GET"
        }).then(function(response){
            let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon +"&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(response2){
                var date = new Date(response.dt * 1000).toDateString();
                $city.text(`${response.name} (${date})`);
                $temp.text(`${response.main.temp} °F`);
                $humidity.text(`${response.main.humidity}%`);
                $wind.text(`${response.wind.speed} MPH`);
                $uv.text(response2.value);
            })
        })
    })
});