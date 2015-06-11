/*
 * Tests of sdv.js library function utils.
 */
describe('SDV.Util.Function (library function utils).', function() {
    // Checks that SDV.Util.Function namespace is defined as expected.
    describe('SDV.Util.Function namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Function).to.be.an('object');
        });
    });
});
