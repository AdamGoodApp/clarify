jQuery(document).ready(function($) {

  //** SCROLL TO FIRST PAGE WHEN CLICKING LOGO **//

  $('body').on('click', '#primary-header .company-logo', function() {

    if ( $('.navigation-menu.active').length ) {

      closePages();
      $("#menu").toggleClass("active");
      $("#mobile-menu").toggleClass("active");
      $(".hamburger-menu").toggleClass("active");
      $(".hamburger-menu").toggleClass("open");

    } else {

      $('#clarify-description, .accordion, .accordion > section').removeClass('active');
      $('.accordion > section .section-content').slideUp(1000, function(){
      $('#welcome, #clarify-description, .accordion > section').removeClass('offscreen');
        $('#welcome').addClass('active');
        $('#welcome').removeClass('pushed');
      });
      $('.accordion').css('position', 'fixed');

    }

  });
  
  //** WELCOME PAGE TO DESCRIPTION PAGE **//
  $('body').on('click', '.read-more', function() {

    $("#welcome").addClass("pushed");

    $("#clarify-description").addClass("active");

  });

  //** MOVE BACK TO WELCOME PAGE **//
  $('body').on('click', '#clarify-description .up-arrow', function() {

    $('#welcome').addClass('active');
    $('#welcome').removeClass('pushed');

    $('#clarify-description').removeClass('active');

  });

  //** DESCRIPTION PAGE TO STAGE ONE **//
  $('body').on('click', '.get-started', function() {

    $('#clarify-description').addClass('offscreen');
    $('#welcome').addClass('offscreen');

    $('.form-progress').addClass('active');
    $('.accordion').addClass('active');
    $('#stage-one').addClass('active');

    $('#stage-one .section-content').slideDown(1000);

    resizeFields("#stage-one .answer-container");

    setTimeout(function(){ $('.accordion').css('position', 'relative'); }, 1000);

    setTimeout(function(){
      $(".tooltip").fadeIn(1000, function() {
        $(".tooltip").delay(6000).fadeOut(1000, function() {
          $(".tooltip").remove();
        });
      });
    }, 2000);

  });


  //** STAGE ONE TO STAGE TWO **//
  $('body').on('click', '#stage-one .save-proceed-button', function() {

    $("#stage-one form").parsley().validate();

    if ( $("#stage-one form").parsley().isValid() ) {
      changeStage('#stage-one', '#stage-two');

      $('.stage-one-progress').removeClass('invalid');
      $('.stage-one-progress').addClass('success');
    } else {
      // Add invalid class to stage one in progress bar
      $('.stage-one-progress').addClass('invalid');
      // Smooth scroll to first .parsley-errors-list in #stage-one form
      $('body, html').animate({
        scrollTop: $('.parsley-custom-error-message:first').offset().top - 160
      }, 1000);
    }

  });

  //** MOVE BACK TO STAGE ONE **//
  $('body').on('click', '#stage-two .back-button', function() {

    changeStage('#stage-two', '#stage-one');

  });

  //** STAGE TWO TO STAGE THREE **//
  $('body').on('click', '#stage-two .save-proceed-button', function() {

    changeStage('#stage-two', '#stage-three');
    // TODO: Add active class to stage two in progress bar
    $('.stage-two-progress').addClass('success');

  });

  //** MOVE BACK TO STAGE TWO **//
  $('body').on('click', '#stage-three .back-button', function() {

    changeStage('#stage-three', '#stage-two');

  });

  //** STAGE THREE TO STAGE FOUR **//
  $('body').on('click', '#stage-three .save-proceed-button', function() {

    $("#stage-three form").parsley().validate();

    if ( $("#stage-three form").parsley().isValid() ) {
      changeStage('#stage-three', '#stage-four');
      $('.stage-three-progress').removeClass('invalid');
      // Add success class to stage one in progress bar
      $('.stage-three-progress').addClass('success');
    } else {
      // Add invalid class to stage one in progress bar
      $('.stage-three-progress').addClass('invalid');
      // Smooth scroll to first .parsley-errors-list in #stage-one form
      $('body, html').animate({
        scrollTop: $('.parsley-custom-error-message:first').offset().top - 160
      }, 1000);
    }

  });

  //** MOVE BACK TO STAGE THREE **//
  $('body').on('click', '#stage-four .back-button', function() {

    changeStage('#stage-four', '#stage-three');

  });

  //** STAGE FOUR TO STAGE FIVE **//
  $('body').on('click', '#stage-four .save-proceed-button', function() {

    changeStage('#stage-four', '#stage-five');
    // TODO: Add active class to stage four in progress bar
    $('.stage-four-progress').addClass('success');
  });


  //** GENERIC SCRIPT FOR GOING BACK **//
  $('body').on('click', '.accordion > section.offscreen', function() {

    var currentActive = $(".accordion > section.active").attr("id");

    var moveTo = $(this).attr("id");

    changeStage('#' + currentActive, '#' + moveTo);

  });


  //** FORM PROGRESS **//
  $('body').on('click', '.stage-one-progress.success', function() {
    var currentActive = $(".accordion > section.active").attr("id");
    changeStage('#' + currentActive, '#stage-one');
  });
  $('body').on('click', '.stage-two-progress.success', function() {
    var currentActive = $(".accordion > section.active").attr("id");
    changeStage('#' + currentActive, '#stage-two');
  });
  $('body').on('click', '.stage-three-progress.success', function() {
    var currentActive = $(".accordion > section.active").attr("id");
    changeStage('#' + currentActive, '#stage-three');
  });
  $('body').on('click', '.stage-four-progress.success', function() {
    var currentActive = $(".accordion > section.active").attr("id");
    changeStage('#' + currentActive, '#stage-four');
  });


  //** OPEN UP ANSWER EXAMPLES ON QUESTION **//
  $('body').on('click', '#stage-three .examples-button', function() {
    $(this).parents('.answer-container').next('.example-container').slideDown(1000);
    $(this).fadeOut(1000);
  });

  //** CLOSE ANSWER EXAMPLES ON QUESTION **//
  $('body').on('click', '#stage-three .example-close', function() {
    $(this).parents('.example-container').slideUp(1000);
    $(this).parents('.example-container').prev().find(".examples-button").fadeIn(1000);
  });


  //** OPEN PAGE ON MENU CLICK **//
  $('body').on('click', '#menu li a, #mobile-menu li a', function(e) {
    e.preventDefault();
    openPage($(this).data("page"));
  });


  //** OPEN PAGE ON GENERAL LINK CLICK **//
  $('body').on('click', '.open-page', function(e) {
    e.preventDefault();
    openPage($(this).data("page"));
    $(".hamburger-menu").trigger("click");
  });

});