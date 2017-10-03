import MedicalrecordcontrollerApi from '../client/api/MedicalrecordcontrollerApi';
import EmergencydatacontrollerApi from '../client/api/EmergencydatacontrollerApi';
import UserService from './User';

export default class PacienteService {
  static vincular(token) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    // TODO: utilizar endpoint

    return new Promise((resolve, reject) => {
      console.log(token);
      resolve(token);
    });
  }

  static getDatosEmergencia(pacienteId) {
    return new Promise((resolve, reject) => {
      resolve({
        campoA: '123',
        campoB: 123,
      });
    });
  }

  static getCambiosDatosEmergencia() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.getChangesUsingGET();
  }

  static getCodigoQR() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.getQRUsingGET();
  }

  static generarCodigoQR() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.createQRUsingPOST();
  }

  static deprecarCodigoQR() {
    const API = new EmergencydatacontrollerApi(UserService.getApiClient());
    return API.deleteQRUsingDELETE();
  }
}
