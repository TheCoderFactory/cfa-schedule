(function () {
  'use strict';

  describe('IntakeService', function() {
    var service, $httpBackend, handler, groupData, errorMessage;

    beforeEach(module('cfaSchedule'));

    beforeEach(inject(function (_$httpBackend_, _IntakeService_) {
      $httpBackend = _$httpBackend_;
      service = _IntakeService_;
      groupData = [];

      handler = {
        success: function(group) {
          groupData.push(group);
        },
        error: function(err) {
          errorMessage = err;
        }
      };

      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    }));

    it('should get the list of intakes', function () {

    });
  });
});