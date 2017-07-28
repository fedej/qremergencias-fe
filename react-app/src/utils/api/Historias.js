import MedicalrecordcontrollerApi from '../client/api/MedicalrecordcontrollerApi';
import UserService from './User';

export default class HistoriasService {
  static list() {
    const options = {
      page: 0,
      size: 10,
    };
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());
    return API.listUsingGET(options);
  }

  static upload(form) {
    const API = new MedicalrecordcontrollerApi(UserService.getApiClient());

    return new Promise((resolve, reject) => {
      console.log(form);
      return API.createUsingPOST(form).then((response) => {
        console.log(response);
        resolve();
      }).catch((err) => {
        console.log(err);
        reject('[HistoriasService].upload');
      });
    });
  }
}
