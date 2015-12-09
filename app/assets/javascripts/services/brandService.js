angular.module('brandApp').factory('Brand', ['$resource', function($resource) {
  
  return $resource("/api/brands/:id", { id: "@id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' },
      'send_email': {method: 'GET', isArray: true}
    }
  );

}]);

