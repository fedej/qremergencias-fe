import MedicalrecordcontrollerApi from './MedicalrecordcontrollerApi';
import UserService from './User';

export default class PacienteService {
  static verificar(token) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    // TODO: utilizar endpoint

    return new Promise((resolve, reject) => {
      console.log(token);
      resolve('5974cb7df99fb75d23d63687');
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
