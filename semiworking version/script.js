var searchField = $(".searchField");
var queryParams={
    locations1:{

    },
    location2:{

    }
    
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
    zoom: 8
  });
  
  var marker = new google.maps.Marker({
    position: firstpin,  //queryParams.location1.
    map: map,
    title: 'Hello World!'
  });
}


$(".searchLocale").on("click", function(){
    
    var searchTerm = searchField.val();
    //console.log(searchTerm);
    
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

$(".showOptions").on("click", function(){
    queryParams = { 
        // "appid": "CHxZJb0CdGwHtBXXsf_zhyCO559XQ5cDfBGbEHxLM77vW2zz4gwxPOfbS2WNowgtgZrWBg_4-2hQoKn-B_hlh_z8cNJgFXZkEZ635hT0JYCse5mei4tFMuZI8QBtXnYx", 
        "term": "vegan",
        //"location": searchTerm,
    };
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){  //Asynchronous like an ajax call.
            /*
            for (var i = 0; i < 5; i++){
                queryParams.location.latitude = position.businesses[i].coordinates.latitude;
                queryParams.location.longitude = position.businesses[i].coordinates.latitude;
            }
            console.log(queryParams);
            //lookupInfo();
            //initMap2();
            */
        });
    }else{
        alert("Geolocation not supported by your browser");
    }
    //console.log(navigator.geolocation);
    //lookupInfo();

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
    }).catch((error) => {
        console.log("error")
    })

}
