
export const validateForm = (errors, inputs) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  Object.values(inputs).forEach(
      // if we have an input string empty then set valid to false
      (val) => val.length === 0 && (valid = false)
    );
  return valid;
}

export const validateEmail = (email) =>{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
  let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
  return regex.test(password);
}

export const deleteAllCookies = () => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}