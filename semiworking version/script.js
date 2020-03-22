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
        zoom: 11
    });
    console.log(queryParams.locations.length);
    if (queryParams.locations.length != 0){
        console.log(queryParams.locations.length);
        for (var i = 0; i < queryParams.locations.length; i++){
            var marker = new google.maps.Marker({
            position: queryParams.locations[i],
            map: map,
            title: queryParams.locations[i].name,
            });
        }
    }
}

$(".showOptions").on("click", function(){
    qeuryParams = {  //default lat and lon are the user location. (from the if statement above.)
        locations:[],
    }
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
    queryParams.term = "vegan";
    console.log(queryParams);
    lookupInfo();
})

$(".searchLocale").on("click", function(){
    var searchTerm = searchField.val();  
    queryParams = { 
        "term": "vegan",
        locations:[],
    };
    getLatLon(searchTerm);
})

function getLatLon(locale){
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locale + "&key=AIzaSyAjby3pU0mhZRvOI5WS5YoOkWUpd6XJ27o"
    $.ajax({
        url: queryURL,
        method:'GET'
    }).done((response)=>{
        console.log(response);
        queryParams.latitude = response.results[0].geometry.location.lat;
        queryParams.longitude = response.results[0].geometry.location.lng;
        console.log(queryParams.latitude);
        lookupInfo();
    })
}

function lookupInfo(){
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
                name : response.businesses[i].name,
            }
            queryParams.locations.push(currentLocal);
        }
        initMap();
        console.log(queryParams);
    }).catch((error) => {
        console.log("error")
    })
}

//Use css to reduce the opacity/ or pointer event (turn it to none)/ disable class.
