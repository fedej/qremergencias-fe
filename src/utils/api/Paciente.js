import MedicalrecordcontrollerApi from '../client/api/MedicalrecordcontrollerApi';
import UserService from './User';

const CAMBIOS_SAMPLE = {
  content: [
    {
      id: '7.0',
      date: '2017-09-04T15:58:50.189',
      author: 'medico@rrramundo.com.ar',
      changes: {
        general: [
          {
            property: 'bloodType',
            oldValue: '0+',
            newValue: 'B+',
            added: null,
            removed: null
          }
        ]
      }
    },
    {
      id: '8.0',
      date: '2017-09-04T15:59:54.628',
      author: 'medico@rrramundo.com.ar',
      changes: {
        general: [
          {
            property: 'bloodType',
            oldValue: 'B+',
            newValue: 'AB+',
            added: null,
            removed: null
          },
          {
            property: 'allergies',
            oldValue: null,
            newValue: null,
            added: [

            ],
            removed: [
              'AAA'
            ]
          }
        ],
        pathologies: [
          {
            property: 'pathologies[1].description',
            oldValue: 'ADNs',
            newValue: 'ADNsssss',
            added: null,
            removed: null
          }
        ]
      }
    },
    {
      id: '2.0',
      date: '2017-09-03T19:13:41.039',
      author: 'medico@rrramundo.com.ar',
      changes: {
        general: [
          {
            property: 'allergies',
            oldValue: null,
            newValue: null,
            added: [
              'AAA'
            ],
            removed: [

            ]
          }
        ]
      }
    },
    {
      id: '4.0',
      date: '2017-09-03T19:19:37.575',
      author: 'medico@rrramundo.com.ar',
      changes: {
        surgeries: [
          {
            property: 'surgeries[1].date',
            oldValue: '2016-10-10',
            newValue: '2016-10-05',
            added: null,
            removed: null
          },
          {
            property: 'surgeries[1].reason',
            oldValue: 'Cambio de sexo invertido',
            newValue: 'Cambio de sexo invertidos',
            added: null,
            removed: null
          }
        ]
      }
    },
    {
      id: '6.0',
      date: '2017-09-04T14:52:10.785',
      author: 'medico@rrramundo.com.ar',
      changes: {
        pathologies: [
          {
            property: 'pathologies[1].description',
            oldValue: 'ADN',
            newValue: 'ADNs',
            added: null,
            removed: null
          }
        ]
      }
    },
    {
      id: '3.0',
      date: '2017-09-03T19:16:52.341',
      author: 'medico@rrramundo.com.ar',
      changes: {
        surgeries: [
          {
            property: 'surgeries[0].reason',
            oldValue: 'Cambio de sexo',
            newValue: 'Cambio de sexos',
            added: null,
            removed: null
          }
        ]
      }
    }
  ],
  totalPages: 1,
  totalElements: 6,
  last: true,
  sort: null,
  numberOfElements: 6,
  first: true,
  size: 0,
  number: 0
};

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

  static getCambiosDatosEmergencia(pacienteId) {
    return new Promise((resolve, reject) => {
      resolve(CAMBIOS_SAMPLE);
    });
  }
}
