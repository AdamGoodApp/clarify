function resizeFields(fields) {

	if (window.innerWidth < 850) {
		return
	} else {

	  $(fields).each( function() {

			var fieldHeight;

			if ( $(this).hasClass("textarea") ) {
				// Get height of textarea
				fieldHeight = $(this).find("textarea").prop('scrollHeight');
			} else {
				// Get height of input
				fieldHeight = $(this).find("input").height();
			}

			// Get height of answer container
			var descriptionHeight = $(this).find(".form-field-description").outerHeight();

			// Get biggest
			var biggest = Math.max( descriptionHeight, fieldHeight );

			// Set height
			$(this).height(biggest);

			if ( $(this).hasClass("textarea") ) {
				// Get height of textarea
				$(this).find("textarea").height(biggest - 50);
			} else {
				// Get height of input
				$(this).find("input").height(biggest - 50);
			}

	  });

  }
  
}