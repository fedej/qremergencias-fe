import config from '../../constants/app';

export default class UserService {
  static login(credenciales) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/login`, {
        method: 'POST',
        body: JSON.stringify(credenciales),
        contentType: 'application/x-www-form-urlencoded',
      })
        .then(response => response.json())
        .then((user) => {
          resolve({});
          // resolve(user);
        })
        .catch((err) => {
          resolve({});
          // reject(err);
        });
    });
  }

  static register(credenciales) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/userFront/register`,
        { method: 'POST', body: JSON.stringify(credenciales) })
        .then(response => response.json())
        .then((user) => {
          resolve({});
          // resolve(user);
        })
        .catch((err) => {
          resolve({});
          // reject(err);
        });
    });
  }

  static forgotPassword(data) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/userFront/sendForgotPassword`,
        { method: 'POST', body: data })
        // .then(response => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch(err => reject(err));
    });
  }

  static resetPassword(data) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/userFront/resetPassword`,
        { method: 'POST', body: data })
        // .then(response => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch(err => reject(err));
    });
  }

  static completeRegistration(data) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/userFront/completeRegistration`,
        { method: 'POST', body: data })
        // .then(response => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch(err => reject(err));
    });
  }
}
