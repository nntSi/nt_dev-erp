import { server } from "./constant";

const isLoggedIn = () => {
  const token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
}

const setUserdata = (
  username: string,
  token: string,
  title: string,
  fullname: string,
  lastname: string,
  email: string,
  mobile: string,
  privi: string,
) => {
  localStorage.setItem(server.USERNAME, username);
  localStorage.setItem(server.TITLE, title);
  localStorage.setItem(server.FULLNAME, fullname);
  localStorage.setItem(server.LASTNAME, lastname);
  localStorage.setItem(server.EMAIL, email);
  localStorage.setItem(server.MOBILE, mobile);
  localStorage.setItem(server.PRIVI, privi);
  localStorage.setItem(server.TOKEN_KEY, token);
};

const getAccount = () => {
  const data = {
    username: localStorage.getItem(server.USERNAME),
    title: localStorage.getItem(server.TITLE),
    fullname: localStorage.getItem(server.FULLNAME),
    lastname: localStorage.getItem(server.LASTNAME),
    email: localStorage.getItem(server.EMAIL),
    mobile: localStorage.getItem(server.MOBILE),
    privi: localStorage.getItem(server.PRIVI),
    token: localStorage.getItem(server.TOKEN_KEY),
  }
  return data
};

const clearStateLocal = () => {
  localStorage.removeItem(server.USERNAME);
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.removeItem(server.TITLE);
  localStorage.removeItem(server.FULLNAME);
  localStorage.removeItem(server.LASTNAME);
  localStorage.removeItem(server.EMAIL);
  localStorage.removeItem(server.MOBILE);
  localStorage.removeItem(server.PRIVI);
};

export default {
  setUserdata,
  isLoggedIn,
  getAccount,
  clearStateLocal
};
