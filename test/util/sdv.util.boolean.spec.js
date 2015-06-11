/*
 * Tests of sdv.js library boolean utils.
 */
describe('SDV.Util.Boolean (library boolean utils).', function() {
    // Checks that SDV.Util.Boolean namespace is defined as expected.
    describe('SDV.Util.Boolean namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Boolean).to.be.an('object');
        });
    });
});
