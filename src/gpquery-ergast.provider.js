(function() {
  'use strict';

  angular
    .module('gpq-ergast')
    .factory('$gpqErgast', ErgastFactory);

    /* @ngInject */
    function ErgastFactory($resource) {


      // Parameterised URL
      // ------------------------------

      var url = 'http://ergast.com/api/:series/:season/:round/:resource.json';


      // Default Parameters
      // ------------------------------

      var paramDefaults = {
        series    : 'f1',
        season    : 'current',
        round     : 'last',
        resource  : 'results'
      };


      // Custom Actions
      // ------------------------------

      var actions = {
        getResource: {
          method: 'GET',
          params: {resource: '@resource'}
        },
        getDriverStandings: {
          method: 'GET',
          params: {resource: 'driverStandings'}
        },
        getConstructorStandings: {
          method: 'GET',
          params: {resource: 'constructorStandings'}
        }
      };


      // Return $resource Instance
      // ------------------------------

      return $resource(url, paramDefaults, actions);

    }

})();
