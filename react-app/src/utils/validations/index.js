/* eslint-disable no-useless-escape */

export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isValidPassword(pass) {
  const re = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&\/()?¿¡$%]).{8,64})$/;
  return re.test(pass);
}

