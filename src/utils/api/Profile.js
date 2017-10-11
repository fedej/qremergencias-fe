import ProfileControllerApi from '../client/api/ProfileControllerApi';
import UserService from './User';

export default class ProfileService {

  static getProfile() {
    const API = new ProfileControllerApi(UserService.getApiClient());
    return API.listUsingGET();
  }

  static updateProfile(data) {
    const API = new ProfileControllerApi(UserService.getApiClient());
    return API.updateUsingPATCH1(data);
  }

}
