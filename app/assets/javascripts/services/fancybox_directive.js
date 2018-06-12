"use strict";

Front.Directives
  .directive('fancybox', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      scope.openBox = function (url) {
        console.log(url);
          $.fancybox({
            'type': 'image',
            'href': url
          });
       }
    }
  };
});
