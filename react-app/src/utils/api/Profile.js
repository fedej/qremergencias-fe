import ApiClient from '../client/ApiClient';
import ProfilecontrollerApi from '../client/api/ProfilecontrollerApi';

export default class ProfileService {

  static api;

  static getApi() {
    if (!ProfileService.api) {
      const apiClient = new ApiClient();
      apiClient.enabledCookies = true;
      //apiClient.basePath = 'http://192.168.1.14:8082/qremergencias';
      ProfileService.api = new ProfilecontrollerApi(apiClient);
    }
    return ProfileService.api;
  }

  static getProfile() {
    return ProfileService.getApi().listUsingGET1();
  }

  static updateProfile(data) {
    return ProfileService.getApi().updateUsingPATCH(data);
  }

}
