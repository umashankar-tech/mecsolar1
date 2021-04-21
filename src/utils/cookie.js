import cookie from 'js-cookie';

export function setCookie(name,key) {
  try {
    cookie.set(name,key);
    return name;
  } catch (ex) {
    return null;
  }
  
}

export function getCookie(name) {
  return cookie.get(name);
}

export function removeCookie(name) {
    return cookie.remove(name);
}

export function isAuthorised() {
    return getCookie('_token') != null ? true : false;
  }