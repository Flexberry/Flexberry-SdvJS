/*
 * Tests of sdv.js library string utils.
 */
describe('SDV.Util.String (library string utils).', function() {
    // Checks that SDV.Util.String namespace is defined as expected.
    describe('SDV.Util.String namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.String).to.be.an('object');
        });
    });
});
