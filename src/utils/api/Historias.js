import MedicalRecordControllerApi from '../client/api/MedicalRecordControllerApi';
import UserService from './User';

export default class HistoriasService {
  static list(page, size, filters) {
    const options = {
      page,
      size,
      sort: ['performed,desc'],
      from: filters && filters.fechaDesde ? filters.fechaDesde : null,
      to: filters && filters.fechaHasta ? filters.fechaHasta : null,
      text: filters ? filters.nombreHistoria : '',
    };

    const API = new MedicalRecordControllerApi(UserService.getApiClient());
    return API.listMyRecordsUsingGET(options);
  }

  static listByUser(id, token, page, size, filters) {
    // TODO: verificar token
    const options = {
      page,
      size,
      sort: ['performed,desc'],
      from: filters && filters.fechaDesde ? filters.fechaDesde : null,
      to: filters && filters.fechaHasta ? filters.fechaHasta : null,
      text: filters ? filters.nombreHistoria : '',
    };
    const API = new MedicalRecordControllerApi(UserService.getApiClient());
    return API.listPatientRecordsUsingGET(id, options);
  }

  static upload(form) {
    const API = new MedicalRecordControllerApi(UserService.getApiClient());
    return API.createUsingPOST(form);
  }

  static delete(id) {
    const API = new MedicalRecordControllerApi(UserService.getApiClient());
    return API.deleteUsingDELETE(id);
  }
}
