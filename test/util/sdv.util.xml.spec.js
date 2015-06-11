/*
 * Tests of sdv.js library XML utils.
 */
describe('SDV.Util.Xml (library XML utils).', function() {
    // Checks that SDV.Util.Xml namespace is defined as expected.
    describe('SDV.Util.Array namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Xml).to.be.an('object');
        });
    });
});
