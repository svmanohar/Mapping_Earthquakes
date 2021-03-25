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
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create a map object zoomed at level 2
// let map = L.map('mapid').setView([30, 30], 2);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/svmanohar/Mapping_Earthquakes/main/majorAirports.json";

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    // set the maximum zoom parameters
    maxZoom: 18,
    // set the access token to the API key defined in our config.js file
    accessToken: API_KEY
    });

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// Define an object that contains the overlays, always visible
let overlays = {
  Earthquakes: earthquakes
};

// create a base layer that contains both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map. Allows us to switch between layers
// Add the overlays argument to layers to include functionality toggling the Earthquakes layer
L.control.layers(baseMaps, overlays).addTo(map);

// for cleaner code, we declare the styleInfo function outside the d3.json() call, accepting each feature as input
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    // scale the radius of our circleMarkers by the magnitude of the feature (Earthquake)
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  }
  // within our styleInfo function, declare getRadius, accepting the feature.properties.mag value, which we alias as magnitude
  // if magnitude is 0, keep the earthquake at radius 1, while any higher than 0, we scale the marker's size by a factor of 4
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

    // This function determines the color of the circle based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }
};

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
    // assign a function that will fulfil the style argument for the style option of geoJson()
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`Magnitude: ${feature.properties.mag} <br>Location: ${feature.properties.place}`);
    }
        }).addTo(earthquakes); // Add the above markers and styling to the earthquakes layer only

        earthquakes.addTo(map); // Add the earthquakes layer to the map
        // Create a legend control object in the bottom right. Docs for a choropleth object from Leafly here: https://leafletjs.com/examples/choropleth/
        let legend = L.control({
          position: "bottomright"
        });

        // Then add all the details for the legend. We use the Document Object Model (DOM) DomUtil to add the legend to a <div> tag in HTML with id "info legend"
        legend.onAdd = function() {
          let div = L.DomUtil.create("div", "info legend");
          // add arrays to hold our possible magnitudes and corresponding colors
          const magnitudes = [0, 1, 2, 3, 4, 5];
          const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
          ];

                  // Looping through our intervals to generate a label with a colored square for each interval.
          for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
              "<i style='background: " + colors[i] + "'></i> " +
              // ? acts as a if/then statement, syntax <condition ? result_if_true : result_if_false>
              // &ndash is HTML code for a dash or hyphen -
              magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
          return div;
        };

        legend.addTo(map);
    });


