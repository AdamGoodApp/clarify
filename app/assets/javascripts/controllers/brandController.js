angular.module('brandApp').controller('brandController', ['$http', '$scope', 'Brand', '$routeParams', function($http, $scope, Brand, $routeParams) {

  if ($routeParams.id) {
    showBrand();
    $("#welcome").addClass("pushed offscreen");
    $("#clarify-description").addClass("pushed offscreen");
    $(".accordion").addClass("active");
    resizeFields("#stage-one .answer-container");
    setUpSections($scope);
    $("#email").attr("disabled", "disabled").parent().addClass("disabled");
  }

  $scope.refresh = function () {
    showBrand();
  };

  function showBrand() {
    $scope.brand = Brand.show({id: $routeParams.id});
  }


  function setUpSections() {
      setTimeout(function(){
          if ($scope.brand.brand.proposition && $scope.brand.brand.purpose && $scope.brand.brand.personality && $scope.brand.brand.market && $scope.brand.brand.competition_2) {
              $("#stage-one, #stage-two, #stage-three").addClass("offscreen");
              $("#stage-four").addClass("active");
              $(".form-progress").addClass("active").find(".stage-one-progress, .stage-two-progress, .stage-three-progress, .stage-four-progress").addClass("success");
              resizeFields("#stage-four .answer-container");
              $("#stage-four .section-content").css('display', 'block');
              $("#stage-one .overlay").css('display', 'none');
              $("#stage-three .overlay").css('display', 'none');
              $("#stage-one .formfield-wrapper").addClass('hascontent');
              $("#stage-three .formfield-wrapper").addClass('hascontent');
          } else {
              $("#stage-one").addClass("active");
              $(".form-progress").addClass("active").find(".stage-one-progress").addClass("success");
              $("#stage-one .formfield-wrapper").addClass("hascontent");
              $("#stage-one .section-content").css('display', 'block');
              $("#stage-one .overlay").css('display', 'none');
              resizeFields("#stage-one .answer-container");
          }

      }, 400);
  }

  $scope.saveAndEmail = function() {
    $scope.save();
    $scope.sendEmail();
  };

  $scope.saveAndEmailUpdate = function() {
   $scope.save();
   $scope.sendUpdateEmail();
  };

  $scope.save = function(){
    if ($scope.brand.id === undefined){
      createBrand();
    }

    if ($scope.brand.id || $routeParams.id){
      updateBrand();
    }
  };

    //ROB: Please replace alert with class or id
  createBrand = function () {
    Brand.create($scope.brand, function (data) {
      $scope.brand.id = data.brand.id;
      $("#already-taken").removeClass("active");
      $("#email").parent().addClass("saving-email");
      setTimeout(function() {
        $("#email").parent().removeClass("saving-email");
      }, 1500);
    }, function(error){
        if (!$routeParams.id) {
          $("#already-taken").addClass("active");
        }
    });
  };

  updateBrand = function () {

    if ($scope.brand.id) {
      Brand.update({ id: $scope.brand.id }, $scope.brand);
    }

    if ($scope.brand.brand.id) {
      Brand.update({ id: $scope.brand.brand.id }, $scope.brand);
    }
  };

  $scope.sendEmail = function () {
    setTimeout(function() {
      if ($scope.brand.id) {
        console.log("fired brand.id email")
        $http.get('/api/brands/' + $scope.brand.id + '/send_email')
          .success(function (data, status, headers, config) {
          });
      }

      if ($scope.brand.brand.id) {
        console.log("fired brand.brand.id email")
        $http.get('/api/brands/' + $scope.brand.brand.id + '/send_email')
          .success(function (data, status, headers, config) {
          });
      }

      if ($routeParams.id) {
        console.log("fired routeparams.id email")
        $http.get('/api/brands/' + $routeParams.id + '/send_email')
          .success(function (data, status, headers, config) {
          });
      }

    }, 1500);
  };

  $scope.sendUpdateEmail = function () {
    $http.get('/api/brands/' + $scope.brand.brand.id + '/send_update_email')
    .success(function(data, status, headers, config) {
    });
  };

  $scope.logOut = function () {
    $http.get('/logout')
      .success(function(data, status, headers, config) {
      });
  };

  // Save on focus/blur
  $('body').on('blur', 'input, textarea', function() {
    $("#email").parsley().validate();

    if ( $("#email").parsley().isValid() ) {
      $scope.save();
    } else {
      $('body, html').animate({
        scrollTop: $('#email').offset().top - 160
      }, 1000);
      setTimeout(function() {
        $("#email-aside").css("font-weight", "bold");
      }, 1000);
    }

    if ( !loading ) {
      loading = true;
      putOverlayBack($(this));
      loading = false;
    } else {
      setTimeout(function() {
        putOverlayBack($(this));
        loading = false;
      }, 500);
    }
  });

    //ROB: Please replace alerts with addition of class or id
    function sendRetrieveEmail() {
        var email = $("#retrieve-email").val();
        $http.get('/retrieve_brands?email=' + email)
            .success(function(data, status, headers, config) {
                $("#retrieve .success").slideDown(1000, function() {
                  $(this).delay(4000).slideUp(1000);
                });
            }).
            error(function(data, status, headers, config) {
                $("#retrieve .error").slideDown(1000, function() {
                  $(this).delay(4000).slideUp(1000);
                });
            });
    }

    $( ".retrieve_button" ).click(function(e) {
        e.preventDefault();
        sendRetrieveEmail();
    });

}]);
