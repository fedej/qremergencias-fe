import ApiClient from '../client/ApiClient';
import UserfrontcontrollerApi from '../client/api/UserfrontcontrollerApi';

export default class UserService {

  static api = new UserfrontcontrollerApi(ApiClient.instance);

  static register(credenciales) {
    return UserService.api.registerUsingPOST(credenciales);
  }

  static login(credenciales) {
    return UserService.api.loginUsingPOST(credenciales.username, credenciales.password);
  }

  static completeRegistration(data) {
    return UserService.api.completeRegistrationUsingPOST(data);
  }

  static restorePassword(data) {
    return UserService.api.sendForgotPasswordUsingPOST(data.gRecaptchaResponse, data.username);
  }

  static resetPassword(data) {
    return UserService.api.resetPasswordUsingPOST(data);
  }
}
