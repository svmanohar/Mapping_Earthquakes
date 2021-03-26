// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// Alternate means of instantiating the map variable
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       34.0522, -118.2437
//     ],
//     zoom: 14
//   })
//   .setView([36.1733, -120.1794], 7); // center the map between an area of interest, with a zoom level of 7

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Coordinates for each point connecting our line
// let line = [
//   [33.9416,-118.4085],
//   [37.6213,-122.3790],
//   [40.7899, -111.9791],
//   [47.4502, -122.3088]  
// ];

let line = [
  [37.6213,-122.3790],
  [30.1975,-97.6664],
  [43.6777,-79.6248],
  [40.6413,-73.7781]
];

// Create a 'polyline' using line coordinates, coloring it blue and providing styling
L.polyline(line, {
  color: 'blue',
  opacity: 0.5,
  weight: 4,
  dashArray: "10" // make the line a dashed line with spacing "10"
}).addTo(map);

  // We create the tile layer that will be the background of our map.
  // the first part of the API call defines the style to be used for the map
  // Mapbox style docs: https://docs.mapbox.com/api/maps/styles/
  // Mapbox docs for tileLayer: https://leafletjs.com/reference-1.6.0.html#map-example
//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// An array containing each city's location, state, and population.

// re-assign the cities.js array into our script
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  console.log(city)

  // access the location key in each city object and add to map with Leafly's function addTop
  // use a circleMarker which we will vary the size based off population
  L.circleMarker(city.location, {
    radius: city.population/200000, // ensure the radii of each circle is divided by 100000 to maintain scale but make it readable on map, otherwise would be whole map size
    color: "#FFA500",
    fillColor: "#FFA500",
    fillOpacity: 0.2,
    weight: 4
  })

  // to add a popup to each marker, use Leafly's bindPopup() method: https://leafletjs.com/examples/quick-start/
  // bindPopup() takes HTML in quotations for formatting as well as objects passed in
  // starting a line with .<method or function> is the same as chaining it off the previous line's object, but enhances readability

  // toLocaleString() method formats the population to be comma-separated
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")

  // once we're done modifying the marker, we call the .addTo method and add it to our map object
  .addTo(map);

 });

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    // set the maximum zoom parameters
    maxZoom: 18,
    // set the access token to the API key defined in our config.js file
    accessToken: API_KEY
    });
    // Then we add our 'graymap' tile layer to the map.
    streets.addTo(map);