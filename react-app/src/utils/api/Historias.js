import MedicalrecordcontrollerApi from './MedicalrecordcontrollerApi';

export default class HistoriasService {
  static list() {
    const options = {
      page: 0,
      size: 10,
    };

    const API = new MedicalrecordcontrollerApi();
    return API.listUsingGET(options);
  }

  static upload(form) {
    // TODO: integrar con el servidor
    const URL = 'http://localhost:3000/api/upload';

    return new Promise((resolve, reject) => {
      // TODO: quitar
      // return resolve();
      return reject(new Error('Error del servidor'));

      fetch(URL, {
        method: 'POST',
        body: form,
      }).then((response) => {
        console.log(response);
        resolve();
      }).catch((err) => {
        console.log(err);
        reject('[HistoriasService].upload');
      });
    });
  }
}
