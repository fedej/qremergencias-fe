import moment from 'moment';

const HISTORIA = {
  detalle: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
  `,
  archivo: 'http://2.bp.blogspot.com/_rA5gQI4magc/TTNttosjLZI/AAAAAAAACc0/RYOji7Gj6AE/s1600/Historia_Clinica_Neurologica+1.png',
};

const HISTORIAS = [];

for (let i = 0; i < 30; i += 1) {
  HISTORIAS.push({ ...HISTORIA });
}

export default class HistoriasService {

  static byUserId(id) {
    return new Promise((resolve, reject) => {
      const HISTORIAS_USUARIO = HISTORIAS.map((historia, i) => {
        const H = historia;
        H.id = i + 1;
        H.nombre = `HISTORIA ${H.id}`;
        H.fecha = moment().format('DD/MM/YYYY HH:mm');
        return H;
      });

      resolve(HISTORIAS_USUARIO);
    });
  }

}
