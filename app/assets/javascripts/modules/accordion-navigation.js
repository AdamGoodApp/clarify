function changeStage(el1, el2) {

  $(el1).addClass("offscreen");
  $(el1).removeClass("active");
  $(el2).removeClass("offscreen");
  $(el2).addClass("active");

  

  $(el1 + ' .section-content').slideUp(1000, function() {
    $(el2 + ' .section-content').slideDown(1000, function() {
      resizeFields(el2 + " .answer-container");
      $('html,body').animate({
        scrollTop: $(el2).offset().top - 100
      }, 1000);
    });
  });
  
}