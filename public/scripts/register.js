$(function() {
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow':'visible'});

  var user = new User();

  var frApi = new ApiDocumentation.UserfrontcontrollerApi();

  $('#btn-login').on('click', function() {

    user.login({ username: $('#login-username').val(), password: $('#login-password').val()}, function(response) {
      location.href = '/home';
    });

  });

  $('#btn-signup').on('click', function() {

    var dto = new ApiDocumentation.CreateUserDTO();
    ApiDocumentation.CreateUserDTO.constructFromObject({ email: $('#register-username').val(), password: $('#register-password').val(), role: 'ROLE_PACIENTE' }, dto);
    frApi.registerUsingPOST(dto, function(error, data, response) {

      if (error) {
        alert(error);
      }

      location.href = '/home';
    });

  });
});
