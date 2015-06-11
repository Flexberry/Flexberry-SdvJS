mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library object utils.
 */
describe('SDV.Util.Object (library object utils).', function() {
    // Checks that SDV.Util.Object namespace is defined as expected.
    describe('SDV.Util.Object namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Object).to.be.an('object');
        });
    });
});


mocha.run();