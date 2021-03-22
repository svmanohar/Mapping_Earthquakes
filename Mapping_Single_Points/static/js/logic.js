// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// Alternate means of instantiating the map variable
// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  });

  // We create the tile layer that will be the background of our map.
  // the first part of the API call defines the style to be used for the map
  // Mapbox style docs: https://docs.mapbox.com/api/maps/styles/
  // Mapbox docs for tileLayer: https://leafletjs.com/reference-1.6.0.html#map-example
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    // set the maximum zoom parameters
    maxZoom: 18,
    // set the access token to the API key defined in our config.js file
    accessToken: API_KEY
    });
    // Then we add our 'graymap' tile layer to the map.
    streets.addTo(map);