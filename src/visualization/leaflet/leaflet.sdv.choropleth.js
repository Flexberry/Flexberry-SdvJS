/**
 * Leaflet plugin for SDV.Tool.Choropleth visualization.
 */
L.SDV.choropleth = function(choroplethOptions, layerOptions) {
    var choroplethData = SDV.Tool.choropleth(choroplethOptions);

    return new L.GeoJSON(choroplethData, {
        style: function (feature) {
            var categoryStyle = feature.properties.sdv.choropleth.style;
            var strokeStyle = categoryStyle.stroke;
            var fillStyle = categoryStyle.fill;

            var choroplethStyle = {
                stroke: strokeStyle.weight > 0,
                color: strokeStyle.color,
                weight: strokeStyle.weight,
                opacity: strokeStyle.opacity,

                fill: true,
                fillColor: fillStyle.color,
                fillOpacity: fillStyle.opacity
            };

            if (layerOptions && layerOptions.style) {
                return layerOptions.style(feature, choroplethStyle);
            }

            return choroplethStyle;
        },
        onEachFeature: (layerOptions || {}).onEachFeature
    });
};
