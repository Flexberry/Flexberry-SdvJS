/*
 * Tests of sdv.js library utils namespace definition.
 */
describe('SDV.Util basic definitions.', function() {
    // Checks that SDV.Util namespace is defined as expected.
    describe('SDV.Util namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util).to.be.an('object');
        });
    });
});
