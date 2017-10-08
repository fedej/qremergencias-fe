import ApiClient from '../client/ApiClient';
import UserfrontcontrollerApi from '../client/api/UserfrontcontrollerApi';
import config from '../../constants/app';

export default class UserService {

  static api;
  static apiClient;

  static getApiClient() {
    if (!this.apiClient) {
      this.apiClient = new ApiClient();
      this.apiClient.enableCookies = true;
      this.apiClient.basePath = `${config.BASE_URL}/qremergencias`;
    }

    return this.apiClient;
  }

  static getApi() {
    if (!this.api) {
      this.api = new UserfrontcontrollerApi(this.getApiClient());
    }
    return this.api;
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

  static changePassword(options) {
    return UserService.getApi().changePasswordUsingPOST(options);
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
