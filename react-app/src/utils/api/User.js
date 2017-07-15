import ApiClient from '../client/ApiClient';
import UserfrontcontrollerApi from '../client/api/UserfrontcontrollerApi';

export default class UserService {

  static api;

  static getApi() {
    if (!UserService.api) {
      let apiClient = new ApiClient();
      apiClient.enabledCookies = true;
      //apiClient.basePath = '';
      UserService.api = new UserfrontcontrollerApi(apiClient);
    }
    return UserService.api;
  }


  static register(credenciales) {
    return UserService.getApi().registerUsingPOST(credenciales);
  }

  static login(credenciales) {
    return UserService.getApi().loginUsingPOST(credenciales.username, credenciales.password);
  }

  static logout() {
    return UserService.getApi().logoutUsingPOST();
  }

  static completeRegistration(data) {
    return UserService.getApi().completeRegistrationUsingPOST(data);
  }

  static restorePassword(data) {
    return UserService.getApi().sendForgotPasswordUsingPOST(data.gRecaptchaResponse, data.username);
  }

  static resetPassword(data) {
    return UserService.getApi().resetPasswordUsingPOST(data);
  }
}
