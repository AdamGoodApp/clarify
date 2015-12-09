function putOverlayBack(element) {
  if ( !$(element).val() ) {
    $(element).parent().removeClass("active hascontent").siblings().fadeIn(1000);
  } else {
    $(element).parent().addClass("hascontent").removeClass("active");

    if ( ($(element).val() !== currentContent) && $("#already-taken").not(':visible')  ) {
      $("#primary-header").addClass("saving");
      setTimeout(function() {
        $("#primary-header").removeClass("saving");
      }, 1500);
    }
    
  }
}

// Variable for current content, so we can decide whether to show 'saving' or not
var currentContent;

// Loading var
var loading = false;

jQuery(document).ready(function($) {

  // Get all overlays
  var allOverlays = $('.overlay');
  // Fade in
  allOverlays.fadeIn();



  // HIDE OVERLAYS ON CLICK
  $('body').on('click', '.overlay', function() {

    if ( !loading ) {
      loading = true;

       // Fade out overlay
      $(this).fadeOut(1000);
      $(this).siblings().addClass('active').find("input, textarea").focus();
    }

    setTimeout(function(){
      loading = false;
    }, 500);

  });



  // PUT OVERLAY BACK ON BLUR - IF IT DOESN'T HAVE CONTENT
  // NB: See brandController.js for this


  // REMOVE OVERLAY ON FOCUS - FOR TABBING
  $('body').on('focus', 'input, textarea', function() {

    if ( !loading ) {
      loading = true;

      // Get content and put in a var
      currentContent = $(this).val();

      // Fade out overlay
      $(this).parent().addClass("active").siblings(".overlay").fadeOut(1000);

      loading = false;

    }

  });

});