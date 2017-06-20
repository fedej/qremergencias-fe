$(function() {
  $('#status').delay(300).fadeOut();
  $('#preloader').delay(300).fadeOut('slow');
  $('body').delay(550).css({'overflow':'visible'});

  $('#btn-signup').on('click', function() {
    console.log('ok');
  });

  $('#btn-login').on('click', function() {
    console.log('ok');
  });

});
