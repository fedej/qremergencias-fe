import EmergencydatacontrollerApi from '../client/api/EmergencydatacontrollerApi';
import UserService from './User';

export default class DataService {

  static getData(username) {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.getEmergencyDataUsingGET(username);
  }

  static updateData(data, username) {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.updateEmergencyDataUsingPATCH(data, username);
  }

}
