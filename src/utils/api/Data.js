import EmergencyDataControllerApi from '../client/api/EmergencyDataControllerApi';
import UserService from './User';

export default class DataService {

  static getData(username) {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.getEmergencyDataUsingGET(username);
  }

  static updateData(data, username, qrUpdateRequired) {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.updateEmergencyDataUsingPATCH(data, username, qrUpdateRequired);
  }

}
