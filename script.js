var searchField = $(".searchField");
var queryParams={
    locations: [],
    
};

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){  //Asynchronous like an ajax call.
        //console.log(position);
        queryParams.latitude = position.coords.latitude;
        queryParams.longitude = position.coords.longitude;
        initMap();
    });
}else{
    alert("Geolocation not supported by your browser");
}


var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: queryParams.latitude, lng: queryParams.longitude},
    zoom: 12
    });
    console.log(queryParams.locations.length);
    if (queryParams.locations.length != 0){
        console.log(queryParams.locations.length);
        for (var i = 0; i < queryParams.locations.length; i++){
            console.log("Running")
            var marker = new google.maps.Marker({
            position: queryParams.locations[i],
            map: map,
            title: 'Hello World!'
            });
        }
    }
}
$(".showOptions").on("click", function(){
    queryParams.term = "vegan";
    console.log(queryParams);
    lookupInfo();
})


$(".searchLocale").on("click", function(){
    var searchTerm = searchField.val();  
    queryParams = { 
        // "appid": "CHxZJb0CdGwHtBXXsf_zhyCO559XQ5cDfBGbEHxLM77vW2zz4gwxPOfbS2WNowgtgZrWBg_4-2hQoKn-B_hlh_z8cNJgFXZkEZ635hT0JYCse5mei4tFMuZI8QBtXnYx", 
        "term": "vegan",
        "location": searchTerm,
    };
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){  //Asynchronous like an ajax call.
            console.log("looking for " + searchTerm);
            lookupInfo();
        });
    }else{
        alert("Geolocation not supported by your browser");
    }
})



function lookupInfo(){
    var queryURL = "https://api.yelp.com/v3/businesses/search";
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?' + $.param(queryParams),
        method: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer EAiT4QPvfYbZKL0_ajV7ofQBUW6xOOBY1NjctoX5zaX-yfg9sDPalRuX2b5YszI6m_rlXe3ioXqKp476BS1iRe6Of-n9nWt16B2P5zfEhFYqgETjT3xhXbXYOytwXnYx'
        }
    }).done((response) => {
        console.log(response)
        for (var i = 0; i < response.businesses.length; i++){
            var currentLocal = {
                lat : response.businesses[i].coordinates.latitude,
                lng : response.businesses[i].coordinates.longitude,
            }
            queryParams.locations.push(currentLocal);
        }
        initMap();
        console.log(queryParams);
    }).catch((error) => {
        console.log("error")
    })

}
