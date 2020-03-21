var searchField = $(".searchField");
var queryParams={};


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
        "latitude":"",
        "longitude":"",
    };
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){  //Asynchronous like an ajax call.
            //console.log(position);
            
            queryParams.latitude = position.coords.latitude;
            queryParams.longitude = position.coords.longitude;
            //console.log(queryParams.latitude);
            //console.log(queryParams.longitude);
            lookupInfo();
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
//lookupInfo();
/*
$(document).ready(function(){
    var userPosition = 
    {
    lat: '',
    lon: ''};
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            userPosition.lat = position.coords.latitude;
            userPosition.lon = position.coords.longitude;
            console.log(userPosition.lat); //This shows me the latitude

        })
    }else{
        alert("Geolocation not supported by your browser");
    }
}*/