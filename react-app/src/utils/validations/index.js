/* eslint-disable no-useless-escape */

export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isValidDNI(dni) {
  const re = /^(?:[0-9]+\.){2}[0-9]+$/;
  return re.test(dni);
}

export function isValidPhoneNumber(phone) {
  const re = /^(\+)?\d{1,4}(( |\(| \(|-)?\d{1,4}( |\)|\) |-)?)?(\d{2} )?\d{2,4}[- ]?\d{2,3}[- ]?\d{0,2}$/;
  return re.test(phone);
}
