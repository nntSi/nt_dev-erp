import router from "../../router";
import axios from "axios";
// import api
import api from "../../services/api";
// import constant
import { apiUrl } from "../../services/constant";
export const authen = {
  namespace: true,
  state: () => ({
    userdata: {
      username: "",
      title: "",
      fullname: "",
      lastname: "",
      mobile: "",
      privi: "",
      email: "",
      token: ""
    },
    isLogin: false,
  }),
  actions: {
    login({ commit }: any, payload: any) {
      axios.post(apiUrl + '/auth/login', payload.login_form).then(response => {
        if(response.data.isLogin == true){
          commit("setUserState", response.data.userdata);
          commit("setLoginState", response.data.isLogin);
          router.push('/dashboard');
        }else{
          api.clearStateLocal();
          commit("setLoginState", response.data.isLogin);
          router.push('/');
        }
      });
    },
    restoreLogin({ commit }: any) {
      if(api.isLoggedIn() == true){
        commit("restoreLogin", api.getAccount());
        commit("setLoginState", true);
      }else{
        api.clearStateLocal();
        router.push('/');
        commit("setLoginState", false);
      }
    },
    logout({ commit }: any) {
      api.clearStateLocal();
      commit("restoreLogin", api.getAccount());
      router.push('/');
      commit("setLoginState", false);
    }
  },
  mutations: {
    setUserState(state: any, payload: any) {
      state.userdata.username = payload[0].username;
      state.userdata.title = payload[0].title;
      state.userdata.fullname = payload[0].fullname;
      state.userdata.lastname = payload[0].lastname;
      state.userdata.email = payload[0].email;
      state.userdata.privi = payload[0].privi;
      state.userdata.mobile = payload[0].mobile;
      state.userdata.token = payload[0].token;
      api.setUserdata(
        payload[0].username,
        payload[0].token,
        payload[0].title,
        payload[0].fullname,
        payload[0].lastname,
        payload[0].email,
        payload[0].mobile,
        payload[0].privi
      );
    },
    setLoginState(state: any, payload: any) {
      state.isLogin = payload;
    },
    restoreLogin(state: any, payload: any){
      state.userdata = payload
    },
  },
  getters: {
    getUserState(state: any) {
      return state.userdata;
    },
    isLoginState(state: any) {
      return state.isLogin;
    },
  },
};
