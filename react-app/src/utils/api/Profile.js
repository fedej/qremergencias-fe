import ProfilecontrollerApi from '../client/api/ProfilecontrollerApi';
import UserService from './User';

export default class ProfileService {

  static getProfile() {
    const API = new ProfilecontrollerApi(UserService.getApiClient());
    return API.listUsingGET1();
  }

  static updateProfile(data) {
    //return ProfileService.getApi().updateUsingPATCH(data);
  }

}
