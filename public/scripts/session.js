$(function() {
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow':'visible'});

  var user = new User();

  var frApi = new ApiDocumentation.UserfrontcontrollerApi();

  $('#btn-login').on('click', function() {
    var data = { username: $('#login-username').val(), password: $('#login-password').val()};

    user
      .login(data, function(response) {
        location.href = '/home';
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
        location.href = '/home';
      }
    });

  });
});
