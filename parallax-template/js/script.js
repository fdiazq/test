var map, infoWindow;

function createMap () {
  var options = {
    center: { lat:33.128075, lng: -117.160146 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });

    map.fitBounds(bounds);
  });

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

function handleLocationError (content, position){
infoWindow.setPosition(position);
infoWindow.setContent(content);
infoWindow.open(map);
}
}

// var map, infoWindow;
//
// function createMap () {
//   var options = {
//     center: {lat:33.128075, lng: -117.160146},
//     zoom: 16
//   };
//   map = new google.maps.Map(document.getElementById('map'),options);
//
//   var input = document.getElementById('search');
//   var searchBox = new google.maps.places.SearchBox(input);
//
//   map.addListener('bounds changed', function(){
//     searchBox.setBounds(map.getBounds());
//   });
//
//   var markers = [];
//
//   searchBox.addListener('places_changed', function() {
//     var places = searchBox.getPlaces();
//
//   if(places.length == 0)
//     return;
//
//   markers.forEach(function (m) { m.setMap(null); });
//   markers = [];
//
//   var bounds = new google.maps.LatLngBounds();
//
//   places.forEach(function (p) {
//     if(!p geometry)
//     return;
//
//     markers.push(new google.maps.Marker({
//       map: map,
//       title: p.name,
//       position: p.geometry.location
//     }));
//
//     if(p.geometry.viewport)
//       bounds.union(p.geometry.viewpoint);
//       else
//         bounds.extend(p.geometry.location);
//     });
//     map.fitBounds(bounds);
//     });
// }
