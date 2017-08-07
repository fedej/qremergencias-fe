import EmergencydatacontrollerApi from '../client/api/EmergencydatacontrollerApi';
import EmergencyDataDTO from '../client/model/EmergencyDataDTO';
import UserService from './User';

export default class DataService {

  static getData() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.getEmergencyDataUsingGET();
  }

  static updateData(data) {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    const dto = EmergencyDataDTO.constructFromObject(data);
    return API.createEmergencyDataUsingPOST(dto);
  }

}
