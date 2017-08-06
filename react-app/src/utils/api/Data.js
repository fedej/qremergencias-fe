import EmergencydatacontrollerApi from '../client/api/EmergencydatacontrollerApi';
import UserService from './User';

export default class DataService {

  static getData() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.getEmergencyDataUsingGET();
  }

  static updateData(data) {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.createEmergencyDataUsingPOST(data);
  }

}
