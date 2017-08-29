import ProfilecontrollerApi from '../client/api/ProfilecontrollerApi';
import UserService from './User';

export default class ProfileService {

  static getProfile() {
    const API = new ProfilecontrollerApi(UserService.getApiClient());
    return API.listUsingGET();
  }

  static updateProfile(data) {
    const API = new ProfilecontrollerApi(UserService.getApiClient());
    return API.updateUsingPATCH1(data);
  }

}
