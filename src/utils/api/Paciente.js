import MedicalrecordcontrollerApi from '../client/api/MedicalrecordcontrollerApi';
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
}
