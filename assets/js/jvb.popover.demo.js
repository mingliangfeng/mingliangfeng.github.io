$(function() {
  $('#signin-form').validate_popover({onsubmit: false});

  $(".submit-btn").click(function(ev) {
  	ev.preventDefault();
    
    $('#signin-form').validate().form();

  	return false;
  });
});