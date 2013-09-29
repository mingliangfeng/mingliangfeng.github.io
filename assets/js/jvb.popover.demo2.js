$(function() {
  $("#model-launch").click(function() {
		$('#myModal').modal();
		$('#signin-form').validate_popover({onsubmit: false, popoverPosition: 'top'});

		$(".submit-btn").click(function(ev) {
			ev.preventDefault();

			$('#signin-form').validate().form();
			//$('#signin-form').validate().element($("#client_email"));

			return false;
		});

		$('#myModal').on('hide.bs.modal', function () {
			$.validator.hide_validate_popover($("#client_email, #client_password, #language"));
		});

  });
});