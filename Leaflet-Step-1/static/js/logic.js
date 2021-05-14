
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: apikey
});

var map = L.map("map", {
    center: [30, -95],
    zoom: 2
});

graymap.addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(function (data) {


    function styleConfig(option) {
        return {
            opacity: 1,
            fillColor: getColor(option.geometry.coordinates[2]),
            fillOpacity: 1,
            color: "#000000",
            radius: getRadius(option.properties.mag),
            weight: 0.5,
            stroke: true


        };
    }

    function getColor(x) {
        switch (true) {
            case x > 90:
                return "#873257";
            case x > 80:
                return "#637124";
            case x > 70:
                return "#992357";
            case x > 60:
                return "#777325";
            case x > 50:
                return "#145279";
            case x > 40:
                return "#297113";
            case x > 30:
                return "#122958";
            case x > 20:
                return "#393291";
            case x > 10:
                return "#814591";


            default:
                return "#454545";
        }
    }
    function getRadius(y) {
        if (y === 0) {
            return 1;
        }
        return y * 6;
    }

    L.geoJson(data, {
        pointToLayer: function (option, latlong) {
            return L.circleMarker(latlong);
        },
        style: styleConfig
        //popup 


    }).addTo(map);

    //legend




















});