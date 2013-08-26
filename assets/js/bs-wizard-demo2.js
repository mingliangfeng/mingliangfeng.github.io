$(function() {
  $(".bs-wizard").bs_wizard({beforeNext: before_next});
  $('#last-back').click($(".bs-wizard").bs_wizard('go_prev'));
  $('#signup_form').validate_popover({
  	onsubmit: false,
    rules: {
      'client[password]': {
        required: true,
        minlength: 6,
        maxlength: 20
      },
      'client[password_confirmation]': {
        required: true,
        equalTo: "#client_password"
      },
      'website[sub_name]': {
      	required: true,
        minlength: 5,
        maxlength: 20
      },
      'website[locales][]': {
      	required: true,
        minlength: 1
      }
    }
  });

  $(".submit-btn").click(function(ev) {
  	ev.preventDefault();
  	return false;
  });

  $('[name="website[locales][]"]').click(manipulate_locales);

  $('#btn-signup').click(submit_signup);
  $(window).keydown(function(event) {
    if (event.keyCode === 13) {
      return submit_signup(event);
    }
  });

  function validate_fields(fields, step) {
    var error_step, field, _i, _len;
    for (_i = 0, _len = fields.length; _i < _len; _i++) {
      field = fields[_i];
      if (!form_validator().element(field)) {
        error_step = step;
      }
    }
    return error_step != null ? error_step : true;
  }

  function form_validator() {
    return $('#signup_form').validate();
  }

  function current_step() {
    return $(".bs-wizard").bs_wizard('option', 'currentStep');
  }

  function build_span_label(lable) {
    return "<span class='label label-success'>" + lable + "</span>";
  }

  function before_next() {
    if (current_step() == 1) return validate_fields($('#client_email, #client_password, #client_password_confirmation'), 1) === true;
    if (current_step() == 2) {
      if (validate_fields($('#website_sub_name, #locales_0'), 2) !== true) return false;
      $('#r-email').html($('#client_email').val());
      $('#r-password').html(Array($('#client_password').val().length).join('*'));
      $('#r-address').html("http://" + ($('#website_sub_name').val()) + ".example.com");
      locales = [];
      $('[name="website[locales][]"]:checked').each(function() {
        return locales.push(build_span_label($(this).val()));
      });
      $('#r-locales').html(locales.join(' '));
      $('#r-dlocale').html($("#website_default_locale").val());

      pages = [build_span_label('Home')];
      $("input[name='website[predefined_pages][]']:checked").each(function() {
        return pages.push(build_span_label($(this).val()));
      });
      $('#r-pages').html(pages.join(' '));
      return true;
    }
    return false;
  }

  LOCALES = {'en': 'English', 'zh-CN': 'Simple Chinese'};

  function manipulate_locales() {
    var locale;
    locale = $(this).val();
    if ($(this).is(':checked')) {
      if ($("#opt-" + locale).length === 0) {
        $("#website_default_locale").append($("<option value='" + locale + "' id='opt-" + locale + "'>" + LOCALES[locale] + "</option>"));
      }
    } else {
      $("#opt-" + locale).remove();
    }
  }

  function submit_signup(ev) {
    validate_fields($('#agreeToTheTerms'), 4);
  }

});