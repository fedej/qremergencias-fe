import EmergencyDataControllerApi from '../client/api/EmergencyDataControllerApi';
import TempCodeControllerApi from '../client/api/TempCodeControllerApi';
import UserService from './User';
import config from '../../constants/app';

export default class PacienteService {
  static vincular(token) {
    const API = new TempCodeControllerApi(UserService.getApiClient());
    return API.verifyTempCodeUsingGET(token);
  }

  static getCambiosDatosEmergencia(page, size, filters) {
    const options = {
      page,
      size,
      from: filters && filters.fechaDesde ? filters.fechaDesde : null,
      to: filters && filters.fechaHasta ? filters.fechaHasta : null,
      text: filters ? filters.medico : null,
    };

    const API = new EmergencyDataControllerApi(UserService.getApiClient());
    return API.getChangesUsingGET(options);
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
