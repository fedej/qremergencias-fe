import request from 'superagent';
import config from '../../constants/app';

export default class UserService {
  static register(credenciales) {
    return new Promise((resolve, reject) => {
      request
        .post(`${config.BASE_URL}/qremergencias/api/userFront/register`)
        .withCredentials()
        .send(credenciales)
        .set('Accept', 'application/json;charset=UTF-8')
        .end((err, res) => {
          if (err) {
            reject(res.body.message);
          } else {
            resolve();
          }
        });
    });
  }

  static login(credenciales) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      Object.entries(credenciales).forEach(([key, value]) => formData.append(key, value));

      request
        .post(`${config.BASE_URL}/qremergencias/api/login`)
        .withCredentials()
        .send(formData)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          // if (err) {
          //   reject(res.body.message);
          // } else {
          //   resolve();
          // }
        });
    });
  }

  static completeRegistration(data) {
    return new Promise((resolve, reject) => {
      fetch(`${config.BASE_URL}/qremergencias/api/userFront/completeRegistration`, {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        // .then(response => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch(err => reject(err));
    });
  }

  static restorePassword(data) {
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
}
