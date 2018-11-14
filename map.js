/**
 * Created by liesky on 12/11/2018.
 */

function loadPage() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "http://localhost:5000/?type=7&wifi=on", true);
    xhttp.send();
}

function showData() {

    var L = require('leaflet');

// Initialize the map
    var map = L.map('map').setView([53.551086, 9.993682], 11);

// For different tile layers visit: https://leaflet-extras.github.io/leaflet-providers/preview/
    var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        maxZoom: 19
    }).addTo(map);

    var pinIcon = L.icon({
        iconUrl: 'public/images/pin.png',
        iconSize: [39, 39],
        iconAnchor: [18, 39],
        popupAnchor: [10, -35]
    });


    var marker = L.marker([53.551086, 9.993682], {icon: pinIcon}).addTo(map);
    marker.bindPopup("<b>Hamburg</b>");

}