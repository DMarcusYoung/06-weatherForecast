$(document).ready(function(){
    const $displayDiv = ("#displayDiv");
    const $city = $(".city");
    const $temp = $(".temp");
    const $humidity = $(".humidity");
    const $wind = $(".wind");
    const $uv = $(".uv");
    let cities = [];
    
    $(document).on('click', ".searchBtn", function(){
        const $citySearch = $(".citySearch").val();
        const $cityMenu = $("<li>");
        
        
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + $citySearch + "&units=imperial&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
        $.ajax({
            url,
            method: "GET"
        }).then(function(response){
            let uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon +"&APPID=89f1fcf0b3207d8d3c0dce4e4149158f"
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(response2){
                var date = new Date(response.dt * 1000).toDateString();
                $cityMenu.addClass("list-group-item").text(response.name);
                $('.list-group').append($cityMenu);
                if (localStorage.getItem("cities") != undefined){
                    cities = JSON.parse(localStorage.getItem("cities"));
                }
                cities.push(response.name);
                cities = JSON.stringify(cities);
                localStorage.setItem("cities", cities);

                $city.text(`${response.name} (${date})`);
                $temp.text(`${response.main.temp} °F`);
                $humidity.text(`${response.main.humidity}%`);
                $wind.text(`${response.wind.speed} MPH`);
                $uv.text(response2.value);
                console.log(response, response2);
            })

        })
    })
    // $(document).on('click', ".list-group-item", function(){

    // })
});