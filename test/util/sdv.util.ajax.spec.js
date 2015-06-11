/*
 * Tests of sdv.js library AJAX utils.
 */
describe('SDV.Util.Ajax (library AJAX utils).', function() {
    // Checks that SDV.Util.Ajax namespace is defined as expected.
    describe('SDV.Util.Ajax namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Ajax).to.be.an('object');
        });
    });
});