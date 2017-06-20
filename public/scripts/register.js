$(function() {
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow':'visible'});

  var user = new User();

  $('#btn-login').on('click', function() {
    user.getToken(function(response) {
      console.log(response);
      user.login({ username: 'ale@gmail.com', password: 'Nasdaaas@123' }, response.token, function(response) {
        console.log(response);
        alert('Usuario logueado');
      });
    });
  });

  $('#btn-signup').on('click', function() {
    user.getToken(function(response) {
      console.log(response);
      user.register({ email: 'maggialejs@gmail.com', password: 'Nasdaddd@123', role: 'role_admin' }, response.token, function(response) {
        console.log(response);
        alert('Usuario registrado');
      });
    });
  });
});
