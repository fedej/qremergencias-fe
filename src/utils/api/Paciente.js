import EmergencyDataControllerApi from '../client/api/EmergencyDataControllerApi';
import TempCodeControllerApi from '../client/api/TempCodeControllerApi';
import UserService from './User';
import config from '../../constants/app';

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
    return new Promise(function (resolve, reject) {
      const http = new XMLHttpRequest();
      http.open('HEAD', `${config.BASE_URL}/qremergencias/api/emergencyData/qr?user=${user}`);
      http.withCredentials = true;
      http.onreadystatechange = () => {
        if (http.readyState === http.DONE) {
          if (http.status === 200) {
            resolve('OK');
          } else {
            reject(Error('QR Not Found'));
          }
        }
      };
      http.send();
    });
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
