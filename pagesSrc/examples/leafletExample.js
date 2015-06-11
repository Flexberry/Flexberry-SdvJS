// Map initial position.
var mapStartPosition = [57.9765767849, 56.1710143089];

// Initialize map.
var map = new L.Map('content').setView(mapStartPosition, 17);

// OpenStreetMap layer.
var osmLayer = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);

SDV.Util.Json.getFromFile({
    filePath: 'data/permMicrodistricts.json',
    onSuccess: function(permMicrodistrictsGeoJson, xhr) {
        var permMicrodistrictsLayer = L.SDV.choropleth({
            data: permMicrodistrictsGeoJson,
            mode: 'random'
        },{
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<div style=\"color: black; font-size: 10pt;\">' +
                'Микрорайон \"' + feature.properties.name + '\"' +
                ' (\"' + SDV.Util.String.transliterateCyrillicToLatin(feature.properties.name) + '\" microdistrict).<br />' +
                'Площадь: ' + feature.properties.area + ' м&sup2' + ' (area: ' + feature.properties.area + ' m&sup2).</div>');
            }
        }).addTo(map);

        if (permMicrodistrictsLayer.getLayers().length > 0) {
            map.fitBounds(permMicrodistrictsLayer.getBounds());
        }
    }
});
