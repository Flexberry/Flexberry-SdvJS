/**
 * SDV.Tool.choropleth random mode.
 * Assigns random category with random color to each feature in GeoJSON object.
 * @memberof SDV.Tool.choropleth
 */
SDV.Tool.choropleth.Mode.extend({
    name: 'random',
    method: function(featuresArray, modeOptions) {
        modeOptions = modeOptions || {};
        var defaults = {
            categoryProperty: undefined,
            colors: {
                count: undefined,
                hue: 'random',
                saturation: 'rich',
                brightness: 'bright'
            },
            style: {
                fill: {
                    opacity: 0.75
                },
                stroke: {
                    weight: 2,
                    opacity: 0.85
                }
            }
        };

        var validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'categoryProperty',
            optionFullName: 'modeOptions.categoryProperty',
            isRequired: false,
            allowedTypes: ['String']
        }, {
            optionName: 'style',
            optionFullName: 'modeOptions.style',
            isRequired: false,
            allowedTypes: ['Object'],
            replaceWithDefaultIfUndefined: true
        }, {
            optionName: 'colors',
            optionFullName: 'modeOptions.colors',
            isRequired: false,
            allowedTypes: ['Object'],
            replaceWithDefaultIfUndefined: true
        }], modeOptions, defaults);

        if (!validationResult.isValid) {
            throw new Error(validationResult.message);
        }

        modeOptions = SDV.Util.Object.extend(defaults, modeOptions, true);
        modeOptions.colors.count = featuresArray.length;

        var categoryPropertyIsDefined = typeof modeOptions.categoryProperty !== 'undefined';

        var colors = SDV.Color.random(modeOptions.colors);

        var fillStyle = modeOptions.style.fill;
        var strokeStyle = modeOptions.style.stroke;

        return SDV.Enumerable
            .create(featuresArray)
            .select(function(feature, featureIndex) {
                var randomColor = colors[featureIndex];
                var categoryName = categoryPropertyIsDefined
                    ? SDV.Util.Json.stringify(SDV.Util.Object.getPropertyValue({
                    srcObject: feature.properties,
                    propertyName: modeOptions.categoryProperty
                }))
                    : 'Category №' + featureIndex + 1;

                return {
                    category: categoryName,
                    style: {
                        fill: {
                            color: randomColor,
                            opacity: fillStyle.opacity
                        },
                        stroke: {
                            color: randomColor,
                            weight: strokeStyle.weight,
                            opacity: strokeStyle.opacity
                        }
                    }
                };
            })
            .toArray();
    }
});