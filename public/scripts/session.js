ApiDocumentation.ApiClient.instance.enableCookies = true;
var frApi = new ApiDocumentation.UserfrontcontrollerApi();

function doLogin() {

  var data = { username: $('#login-username').val(), password: $('#login-password').val()};

  frApi.loginUsingPOST(data.username, data.password, grecaptcha.getResponse(), function(error, data, response) {
    console.log('este es el error: ' + error);
    console.log(data);
    console.log(response);
    if (error) {
      alert(error);
    } else {
      location.href = '/home';
    }
  });

};

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

  var user = new User();

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
    user.completeRegistration(data, function(response) {
        console.log(response);
        location.href = '/login';
    })

  });

  $('#btn-forgotPassword').on('click', function() {
    var gcaptcha = "03AHJ_VutJo9e1BnpdN_WSaFcml4fUUjZqAMS-cEin6p_J88dsbHF31JgK6QUYa41uZxput-XzP0jXztOUDlLFHzJT1Rz_qtHBmL_ZfC4O0si4-oo6n3tuU1zR_QPXxb37rPc_v_uc3WC7nDtQF9m5witqbJ_n40_DJZYH3UcutpCJc9_Ke_vSbO5UUzKsp4xFxVqUQcls0QKJrtVomPqzg-ImIFGqb7mv9OYfBlAyWa94wwOSCVjAJy7ZdwEM5Ev4C_gtlbTMAJlpzWFLfVFl7lCl-C7UYu9jlFwfUt8QqfgyDk4xay8zOsjAouA19Fd_BLJAQdjZn_Jp0ZY8yK0pf0yQoi-FCT3oNtNV1OVJecNoUUaEZn-cDVKVrWtfksr9152SPPK2IEj_jRnZCsyhlq0maImq5Ia3HVr3ARpzrS-VRmPNRmjN_Abl-Lj_Knay7qUZrKhdAoqa8y1G_s27imPJg1ymLRvY0C-t0Y3ZeXV7aIhMWT8p57Re6fYbi_bgvMfDq4CUOCIPnKzr0FuL3Ir4o-qw_BOlKwYjm4xiMhhfu1cUIJalw26dJjhDgQhJIGBNokzPHW-iwl9ZX21dAJMc3KT2HARvk9OL0MkVXlA_fZjcFoyftdz8ricyl4lZrb13M-4DNm9u3R2ZxikeujZTNWuZJZIHKSDvp1jAMB4OdQaKjU0NbsVsW9BjF0EYKhu_txUfhtrekuj_O_UtcCs9i_7qXL4XvxoHM5x0Qiya-X2GNEZDj0skRoc5sEO0FZQI1JyLPGUlmWWqJ0X57cM10n6xgG3TBCy83_1iBd30C5F07r9tyJAsVzUQnSD_HPfFaB3b-50kWsmM5NwpzR6c4B544LHPQuQpNDMfC6LnRQnPX3IMihWr0UFPTzP96p5ND6tELAxABM8dxcXk2rilSe0f6k3lUizr6T2l4TYzxcAspmRuFSnGAfROH1Eggyr9W5nHLiJHMojA3CtmDOnBMbLDqRd3CA";
    var data = { username: $('#forgotPassword-username').val(), "g-recaptcha-response": gcaptcha};

    user
      .forgotPassword(data, function(response) {
        console.log(response);
        location.href = '/forgotPasswordSuccess';
      });

  });


  $('#btn-reset-password').on('click', function() {
    var token = new URLSearchParams(window.location.search).get('token');
    var gcaptcha = "03AHJ_VutJo9e1BnpdN_WSaFcml4fUUjZqAMS-cEin6p_J88dsbHF31JgK6QUYa41uZxput-XzP0jXztOUDlLFHzJT1Rz_qtHBmL_ZfC4O0si4-oo6n3tuU1zR_QPXxb37rPc_v_uc3WC7nDtQF9m5witqbJ_n40_DJZYH3UcutpCJc9_Ke_vSbO5UUzKsp4xFxVqUQcls0QKJrtVomPqzg-ImIFGqb7mv9OYfBlAyWa94wwOSCVjAJy7ZdwEM5Ev4C_gtlbTMAJlpzWFLfVFl7lCl-C7UYu9jlFwfUt8QqfgyDk4xay8zOsjAouA19Fd_BLJAQdjZn_Jp0ZY8yK0pf0yQoi-FCT3oNtNV1OVJecNoUUaEZn-cDVKVrWtfksr9152SPPK2IEj_jRnZCsyhlq0maImq5Ia3HVr3ARpzrS-VRmPNRmjN_Abl-Lj_Knay7qUZrKhdAoqa8y1G_s27imPJg1ymLRvY0C-t0Y3ZeXV7aIhMWT8p57Re6fYbi_bgvMfDq4CUOCIPnKzr0FuL3Ir4o-qw_BOlKwYjm4xiMhhfu1cUIJalw26dJjhDgQhJIGBNokzPHW-iwl9ZX21dAJMc3KT2HARvk9OL0MkVXlA_fZjcFoyftdz8ricyl4lZrb13M-4DNm9u3R2ZxikeujZTNWuZJZIHKSDvp1jAMB4OdQaKjU0NbsVsW9BjF0EYKhu_txUfhtrekuj_O_UtcCs9i_7qXL4XvxoHM5x0Qiya-X2GNEZDj0skRoc5sEO0FZQI1JyLPGUlmWWqJ0X57cM10n6xgG3TBCy83_1iBd30C5F07r9tyJAsVzUQnSD_HPfFaB3b-50kWsmM5NwpzR6c4B544LHPQuQpNDMfC6LnRQnPX3IMihWr0UFPTzP96p5ND6tELAxABM8dxcXk2rilSe0f6k3lUizr6T2l4TYzxcAspmRuFSnGAfROH1Eggyr9W5nHLiJHMojA3CtmDOnBMbLDqRd3CA";
    var data = { recaptchaResponse: gcaptcha, newPassword: $('#new-password').val(), token: token, confirmPassword: $('#confirm-password').val()};

    user
      .resetPassword(data, function(response) {
        console.log(response);
        location.href = '/resetPasswordSuccess';
      });

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
      console.log(error);
      if (error) {
        alert(error);
      } else {
        location.href = '/emailConfirmation';
      }
    });

  });
});
