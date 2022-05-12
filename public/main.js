// main.js

function startMap() {
  // const Me = {
  // 	lat:  28.370286,
  // 	lng: -81.4608452};

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
     
    }
    
  );
  // const myMarker = new google.maps.Marker({
  //   position: {
  //     lat: Me.lat,
  //     lng: Me.lng
  //   },
  //   map: map,
  //   title: "Me"
  // });
 
  
  
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
 
      // Center map with user location
      map.setCenter(user_location);
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('center: ', center)

 
      // Add a marker for your user location
      const myMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });
 
    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;
console.log(directionsService)
console.log(directionsDisplay)
const directionRequest = {
  origin: { lat: 28.370286, lng: -81.4608452},
  destination: { lat: 28.37425132388536, lng: -81.51943817889607},
  travelMode: 'WALKING',
  provideRouteAlternatives: true,
};

directionsService.route(
  directionRequest,
  function(response, status) {
    if (status === 'OK') {
      // everything is ok
      directionsDisplay.setDirections(response);

    } else {
      // something went wrong
      window.alert('Directions request failed due to ' + status);
    }
  }
);

directionsDisplay.setMap(map);


}





startMap();
