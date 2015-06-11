mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library validation utils.
 */
describe('SDV.Util.Validation (library validation utils).', function() {
    // Checks that SDV.Util.Validation namespace is defined as expected.
    describe('SDV.Util.Validation namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Validation).to.be.an('object');
        });
    });
});


mocha.run();