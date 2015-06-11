mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library localization features.
 */
describe('SDV.Localization (library localization features).', function() {
    // Checks that SDV.Localization namespace is defined as expected.
    describe('SDV.Localization namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            expect(SDV.Localization).to.be.an('object');
        });
    });
});


mocha.run();