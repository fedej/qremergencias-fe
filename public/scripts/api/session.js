var _host = host;

function User() {

}

User.prototype.getToken = function(callback) {
  $.get(_host + '/qremergencias/api/token', function(data) {
    callback(data);
  });
}

User.prototype.register = function(credenciales, token, callback) {
  $.ajax({
    url: _host + '/qremergencias/api/userFront/register',
    method: 'POST',
    data: JSON.stringify(credenciales),
    xhrFields: {
      withCredentials: true,
    },
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",
    headers: {
      'X-CSRF-TOKEN': token,
    },
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
}

User.prototype.login = function(credenciales, token, callback) {
  $.ajax({
    url: _host + '/qremergencias/api/userFront/login',
    method: 'POST',
    data: JSON.stringify(credenciales),
    xhrFields: {
      withCredentials: true,
    },
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",
    headers: {
      'X-CSRF-TOKEN': token,
    },
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
}
