$(document).ready(function(){
    // const $search = $(".searchBtn");
    $(document).on('click', ".searchBtn", function(){
        const $citySearch = $(".citySearch").val();
        let url = "http://samples.openweathermap.org/data/2.5/weather?q=" + $citySearch + "&appid=b6907d289e10d714a6e88b30761fae22";
        $.ajax({
            url,
            method: "GET"
          }).then(function(response){
              console.log(response);
          })
    })
});