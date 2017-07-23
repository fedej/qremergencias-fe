/* eslint-disable no-useless-escape */

export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isValidDNI(email) {
  const re = /^(?:[0-9]+\.){2}[0-9]+$/;
  return re.test(email);
}

export function hasEmptyStringProperties(object) {
  let isEmpty = true;

  Object.values(object).forEach((value) => {
    if (typeof value === 'string' && value !== '') {
      isEmpty = false;
    }
  });

  return isEmpty;
}
