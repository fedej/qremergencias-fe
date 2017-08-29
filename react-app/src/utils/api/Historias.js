import MedicalrecordcontrollerApi from '../client/api/MedicalrecordcontrollerApi';
import UserService from './User';

export default class HistoriasService {
  static list() {
    const options = {
      page: 0,
      size: 10,
      sort: ['performed,desc'],
    };
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.listMyRecordsUsingGET(options);
  }

  static listByUser(id, token) {
    // TODO: verificar token
    const options = {
      page: 0,
      size: 10,
      sort: ['performed,desc'],
    };
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.listPatientRecordsUsingGET(id, options);
  }

  static upload(form) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.createUsingPOST(form);
  }

  static delete(id) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.deleteUsingDELETE(id);
  }
}
