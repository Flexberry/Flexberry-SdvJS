mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library number utils.
 */
describe('SDV.Util.Number (library number utils).', function() {
    // Checks that SDV.Util.Number namespace is defined as expected.
    describe('SDV.Util.Number namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Util.Number).to.be.an('object');
        });
    });
});


mocha.run();