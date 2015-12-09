jQuery(document).ready(function($) {

    $(".hamburger-menu").on("click", function() {

        if ( $(this).hasClass("active") ) {
            closePages();
        }

        $("#menu").toggleClass("active");
        $("#mobile-menu").toggleClass("active");
        $(this).toggleClass("active");
        $(this).toggleClass("open");
  
    });

});