$(function() {
  $('#signin-form').validate_popover({onsubmit: false, popoverPosition: 'top'});

  $(".submit-btn").click(function(ev) {
  	ev.preventDefault();
    
    $('#signin-form').validate().form();

  	return false;
  });

  $(window).resize(function() {
		$.validator.reposition();
	});
});