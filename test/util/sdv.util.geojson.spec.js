/*
 * Tests of sdv.js library GeoJSON utils.
 */
describe('SDV.Util.Geojson (library GeoJSON utils).', function() {
    // Checks that SDV.Util.Geojson namespace is defined as expected.
    describe('SDV.Util.Geojson namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Geojson).to.be.an('object');
        });
    });
});
