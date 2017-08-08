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
    return API.listUsingGET(options);
  }

  static upload(form) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.createUsingPOST(form);
  }
}
