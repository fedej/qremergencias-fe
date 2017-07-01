ApiDocumentation.ApiClient.instance.enableCookies = true;
var frApi = new ApiDocumentation.UserfrontcontrollerApi();

function doLogin() {

  var data = { username: $('#login-username').val(), password: $('#login-password').val()};

  frApi.loginUsingPOST(data.username, data.password, grecaptcha.getResponse(), function(error, data, response) {
    if (error) {
      console.log(error);
      location.href = '/error';
    } else {
      location.href = '/resetPasswordSuccess';
    }
  });

};

function forgotPassword() {

  frApi.sendForgotPasswordUsingPOST(grecaptcha.getResponse(), $('#forgotPassword-username').val(), function(error, data, response) {
    if (error) {
      console.log(error);
      location.href = '/error';
    } else {
      location.href = '/forgotPasswordSuccess';
    }
  });

};

function resetPassword() {

  var token = new URLSearchParams(window.location.search).get('token');
  var resetData = { recaptchaResponse: grecaptcha.getResponse(), newPassword: $('#new-password').val(), token: token, confirmPassword: $('#confirm-password').val()};

  frApi.resetPasswordUsingPOST(resetData, function(error, data, response) {
    if (error) {
      console.log(error);
      location.href = '/error';
    } else {
      location.href = '/home';
    }
  });

};

function displayError (errores) {
  var str = "";
  errores.forEach (function(item) {
    str += '\u2022' + " ";
    str += item.defaultMessage; 
    str += "<br/>";
  })
  swal({
    title: "Se detectaron errores",
    text: "<div align=\"left\"> " + str + " </div>",
    type: "error",
    html: true
  });
}

$(function() {
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow':'visible'});

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  $('#btn-login').on('click', function() {

    if (readCookie('showCaptcha')) {
      grecaptcha.reset();
      grecaptcha.execute();
    } else {
      doLogin();
    }

  });

  $('#btn-completeRegistration').on('click', function() {
    var token = new URLSearchParams(window.location.search).get('token');
    var data = { name: $('#complete-firstname').val(), lastName: $('#complete-lastname').val(), birthDate: $('#complete-birthdate').val(), token: token};
    frApi.completeRegistrationUsingPOST(data,  function(error, data, response) {
        console.log(response);
        location.href = '/login';
    })

  });

  $('#btn-forgotPassword').on('click', function() {

    if ($('#forgotPassword-username').val()) {
        grecaptcha.reset();
        grecaptcha.execute();
    } else {
        alert('Debe completar email');
    }

  });


  $('#btn-reset-password').on('click', function() {

    if ($('#new-password').val()) {
      grecaptcha.reset();
      grecaptcha.execute();
    } else {
      alert('Debe completar new password');
    }

  });

  $('#btn-signup').on('click', function() {
    var type = location.href.split('?')[1];
    var role = 'ROLE_PACIENTE';
    if (type) {
      if(type.split('=')[1] === 'medico') {
        role = 'ROLE_MEDICO';
      }
    }

    var dto = new ApiDocumentation.CreateUserDTO();
    var data = {
      email: $('#register-username').val(),
      password: $('#register-password').val(),
      role: role,
    };

    ApiDocumentation.CreateUserDTO.constructFromObject(data, dto);
    frApi.registerUsingPOST(dto, function(error, data, response) {
      if (error) {
        if (error.response){
          displayError(error.response.body.errors);
        }
        else {
          location.href = '/error';
        }
      } else {
        location.href = '/emailConfirmation';
      }
    });

  });
});
