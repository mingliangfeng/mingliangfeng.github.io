$(function() {
  $(".bs-wizard").bs_wizard();
  $('#last-back').click($(".bs-wizard").bs_wizard('go_prev'));

  $(".submit-btn").click(function(ev) {
  	ev.preventDefault();
  	return false;
  });
});