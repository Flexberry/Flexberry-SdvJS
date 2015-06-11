mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library JSON utils.
 */
describe('SDV.Util.Json (library JSON utils).', function() {
    // Checks that SDV.Util.Json namespace is defined as expected.
    describe('SDV.Util.Json namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Json).to.be.an('object');
        });
    });
});


mocha.run();