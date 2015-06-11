mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library array utils.
 */
describe('SDV.Util.Array (library array utils).', function() {
    // Checks that SDV.Util.Array namespace is defined as expected.
    describe('SDV.Util.Array namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Array).to.be.an('object');
        });
    });
});


mocha.run();