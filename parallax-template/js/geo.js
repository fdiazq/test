
var map, infoWindow;

function createMap () {
  var options = {
    center: {lat: 33.128075, lng: -117.160146 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);
  infoWindow = new google.maps.InfoWindow;

//Geolocation of user wil display on map
if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function (p){
    var position = {
      lat: p.coords.latitude,
      lng: p.coords.longitude
    };
    infoWindow.setPosition(position);
    infoWindow.setContent('Your Location');
    infoWindow.open(map);
    map.setCenter(position);
  }, function () {
    handleLocationError('Geolocation service not available', map.getCenter());//Implemented error message if gelocation not found
  });
} else{
  handleLocationError('No geolocation available', map.getCenter());
}
}
function handleLocationError (content, position){
infoWindow.setPosition(position);
infoWindow.setContent(content);
infoWindow.open(map);
}
