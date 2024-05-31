// Initialize the map with Seoul (Gangnam) coordinates
var map = new ol.Map({
    target: "map",
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: "http://localhost:8080/geoserver/capstone/wms?service=WMS",
                params: {
                    LAYERS: "capstone:realreal",
                    TILED: true,
                },
                serverType: "geoserver",
                transition: 0,
            }),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.0276, 37.4979]), // Coordinates for Gangnam, Seoul
        zoom: 16, // Adjust the zoom level as needed
    }),
});

// Add controls
var zoomslider = new ol.control.ZoomSlider();
map.addControl(zoomslider);

var fullscreen = new ol.control.FullScreen();
map.addControl(fullscreen);

var scaleLine = new ol.control.ScaleLine();
map.addControl(scaleLine);

var overviewMapControl = new ol.control.OverviewMap({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
});
map.addControl(overviewMapControl);

var geocoder = new Geocoder("nominatim", {
    provider: "osm",
    lang: "en",
    placeholder: "Search for ...",
    limit: 5,
    keepOpen: true,
});
map.addControl(geocoder);

// Create an overlay to anchor the popup to the map
var overlayContainer = document.createElement("div");
overlayContainer.className = "ol-popup";
var overlayContent = document.createElement("div");
overlayContainer.appendChild(overlayContent);
var closer = document.createElement("a");
closer.className = "ol-popup-closer";
closer.href = "#";
overlayContainer.appendChild(closer);

closer.onclick = function () {
    overlayContainer.style.display = "none";
    closer.blur();
    return false;
};

var overlay = new ol.Overlay({
    element: overlayContainer,
    autoPan: false, // Disable autoPan
    positioning: "center-center", // Positioning at the center of the click point
    stopEvent: false,
});
map.addOverlay(overlay);
document.body.appendChild(overlayContainer);

// Function to display building information in the popup
function showBuildingInfo(properties) {
    var content =
        "<p><strong>대지 위치:</strong> " + properties["대지위치"] + "</p>";
    content += "<p><strong>건물명:</strong> " + properties["건물명"] + "</p>";
    content += "<p><strong>세대수:</strong> " + properties["세대수"] + "</p>";
    content +=
        "<p><strong>연면적(㎡):</strong> " + properties["연면적(㎡)"] + "</p>";
    content += "<p><strong>주구조:</strong> " + properties["주구조"] + "</p>";
    content += "<p><strong>높이:</strong> " + properties["높이"] + "</p>";
    content +=
        "<p><strong>지상층수:</strong> " + properties["지상층수"] + "</p>";
    content +=
        "<p><strong>지하층수:</strong> " + properties["지하층수"] + "</p>";
    content +=
        "<p><strong>사용승인일:</strong> " + properties["사용승인일"] + "</p>";
    content += "<p><strong>주용도:</strong> " + properties["주용도"] + "</p>";
    overlayContent.innerHTML = content;
}

// Function to display electric energy information in the popup
function showElectricInfo(properties) {
    var content =
        "<p><strong>대지 위치:</strong> " + properties["대지위치"] + "</p>";
    content += "<p><strong>건물명:</strong> " + properties["건물명"] + "</p>";
    content += "<p><strong>주용도:</strong> " + properties["주용도"] + "</p>";
    content +=
        "<p><strong>전기사용량:</strong> " + properties["전기사용량"] + "</p>";
    content +=
        "<p><strong>전기배출량:</strong> " + properties["전기배출량"] + "</p>";
    overlayContent.innerHTML = content;
}

// Function to display gas energy information in the popup
function showGasInfo(properties) {
    var content =
        "<p><strong>대지 위치:</strong> " + properties["대지위치"] + "</p>";
    content += "<p><strong>건물명:</strong> " + properties["건물명"] + "</p>";
    content += "<p><strong>주용도:</strong> " + properties["주용도"] + "</p>";
    content +=
        "<p><strong>가스사용량:</strong> " + properties["가스사용량"] + "</p>";
    content +=
        "<p><strong>가스배출량:</strong> " + properties["가스배출량"] + "</p>";
    overlayContent.innerHTML = content;
}

// Add a click event to display building attributes in a popup
map.on("singleclick", function (evt) {
    var viewResolution = map.getView().getResolution();
    var wmsSource = map.getLayers().item(1).getSource();
    var url = wmsSource.getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        "EPSG:3857",
        { INFO_FORMAT: "application/json" }
    );

    if (url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.features.length > 0) {
                    var feature = data.features[0];
                    var properties = feature.properties;
                    var filter = document.querySelector(
                        'input[name="filter"]:checked'
                    ).value;
                    if (filter === "building") {
                        showBuildingInfo(properties);
                    } else if (filter === "electric") {
                        showElectricInfo(properties);
                    } else if (filter === "gas") {
                        showGasInfo(properties);
                    }
                    overlay.setPosition(evt.coordinate);
                    overlayContainer.style.display = "block";
                } else {
                    overlayContainer.style.display = "none";
                }
            })
            .catch((error) => {
                console.error("Error fetching feature info:", error);
            });
    }
});

// Search functionality
document.getElementById("search").addEventListener("input", function () {
    var searchValue = this.value;
    if (searchValue.length >= 2) {
        // Implement search functionality here
        // You may use an API or WMS GetFeatureInfo request to search based on "대지 위치"
    }
});
