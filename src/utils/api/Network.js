import config from '../../constants/app';

export const MESSAGE_ERROR = 'No se puede conectar con el servidor';

export default class NetworkManager {
  static async isOnline() {
    try {
      const ENDPOINT = `${config.BASE_URL}/qremergencias/api/login`;
      const request = new Request(ENDPOINT, {
        method: 'HEAD',
      });

      const response = await fetch(request)
        .catch(() => false);

      if (response) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }
}
