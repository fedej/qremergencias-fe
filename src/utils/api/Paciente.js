import EmergencyDataControllerApi from '../client/api/EmergencyDataControllerApi';
import TempCodeControllerApi from '../client/api/TempCodeControllerApi';
import UserService from './User';

export default class PacienteService {
  static vincular(token) {
    const API = new TempCodeControllerApi(UserService.getApiClient());
    return API.verifyTempCodeUsingGET(token);
  }

  static getCambiosDatosEmergencia() {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.getChangesUsingGET();
  }

  static getCodigoQR(user) {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.getQRUsingGET(user);
  }

  static generarCodigoQR() {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.createQRUsingPOST();
  }

  static deprecarCodigoQR() {
    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.deleteQRUsingDELETE();
  }
}
