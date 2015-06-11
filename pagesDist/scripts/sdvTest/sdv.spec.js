mocha.setup('bdd');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

/*
 * Tests of sdv.js library global namespace definitions.
 */
describe('SDV basic definitions.', function() {
    // Checks that given object is an sdv.js library global namespace.
    var assertSdvObject = function (sdv) {
        expect(sdv).to.be.an('object');
        expect(sdv).to.have.property('version');
        expect(sdv).to.have.property('name', 'SDV.js');
    };

    // Checks that sdv.js library global namespace is defined as expected.
    describe('SDV namespace:', function() {
        it('Should be declared as global object.', function() {
            // Assert.
            assertSdvObject(window.SDV);
        });
    });

    // Checks that sdv.js library global namespace "no conflict" definition works as expected.
    describe('Call to SDV.noConflict:', function() {
        it('Should restore old global SDV object, and return SDV.js global namespace to a local variable.', function() {
            // Arrange.
            // Imitation of sdv.js initialization;
            var sdv = window.SDV;
            var oldSdv = {
                name: 'Old SDV object'
            };

            window.SDV = oldSdv;
            sdv.defineSdv();

            // Act.
            sdv = SDV.noConflict();

            // Assert.
            // Stored object should be a global SDV.js namespace.
            assertSdvObject(sdv);

            // Old SDV object should be restored.
            expect(window.SDV).to.be.an('object');
            expect(window.SDV).to.have.property('name', 'Old SDV object');
            expect(window.SDV).to.eql(oldSdv);

            // Reinitializing library after test.
            sdv.defineSdv();
        });
    });
});

mocha.run();