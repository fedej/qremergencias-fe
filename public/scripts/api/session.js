var _host = host;

function User() {

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
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
};

User.prototype.login = function(credenciales, callback) {
  var formData = new FormData();

  for ( var key in credenciales ) {
    formData.append(key, credenciales[key]);
  }

  $.ajax({
    url: _host + '/qremergencias/api/login',
    method: 'POST',
    data: credenciales,
    xhrFields: {
      withCredentials: true,
    },
    contentType: "application/x-www-form-urlencoded",
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
};

User.prototype.forgotPassword = function(data, callback) {
  $.ajax({
    url: _host + '/qremergencias/api/userFront/sendForgotPassword',
    method: 'POST',
    data: data,
    xhrFields: {
      withCredentials: true,
    },
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
};

User.prototype.resetPassword = function(data, callback) {
  $.ajax({
    url: _host + '/qremergencias/api/userFront/resetPassword',
    method: 'POST',
    data: data,
    xhrFields: {
      withCredentials: true,
    },
    dataType: 'json',
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
};

User.prototype.completeRegistration = function(data, callback) {
  $.ajax({
    url: _host + '/qremergencias/api/userFront/completeRegistration',
    method: 'POST',
    data: data,
    xhrFields: {
      withCredentials: true,
    },
    dataType: 'json',
    success: function(response) {
      callback(response);
    },
    error: function(error) {
      callback(error);
    },
  });
};
