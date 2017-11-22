import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TextField } from 'material-ui';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';
import Chip from 'material-ui/Chip';
import moment from 'moment';

export default class Generales extends React.Component {

  static defaultProps = {
    general: {},
    lastMedicalCheck: '',
  }

  static propTypes = {
    general: PropTypes.shape({
      bloodType: PropTypes.string,
      organDonor: PropTypes.bool,
      allergic: PropTypes.bool,
      allergies: PropTypes.array,
      lastMedicalCheck: PropTypes.date,
    }),
  }

  render() {
    const general = this.props.general;
    return (
      general && Object.keys(general).length ? (
        <div className={classnames('formCenter')}>
          <Card style={{ margin: '20px', padding: '10px' }}>
            <CardTitle title="Datos generales de emergencia" />
            <CardText>
              <p>Grupo Sanguineo: {general.bloodType}</p>
              <TextField
                type="text"
                disabled
                value={moment.utc(general.lastMedicalCheck).format('DD / MM / YYYY')}
                floatingLabelText="Último chequeo médico"
                floatingLabelFixed
              />
              <Checkbox
                checked={general.organDonor}
                label="¿Es donante de órganos?"
                disabled
              />
              <Checkbox
                label="¿Es alérgico?"
                checked={general.allergic}
                disabled
              />
              <br />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                  general.allergies ? general.allergies.map((texto, i) => (
                    <Chip key={i}
                      style={{
                        marginRight: '3px',
                        marginBottom: '5px',
                        alignItems: 'center',
                      }}
                    >
                      {texto}
                    </Chip>
                  )) : ''
                }
              </div>
              <br />
            </CardText>
          </Card>
        </div>) : (
          <div>
            <div className={classnames('formCenter')}>
              <h2>¡Parece ser que aún no tenés datos generales cargados!</h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>Aquí podrás ver el listado de datos generales </h2>
            </div>
            <div className={classnames('formCenter')}>
              <h2>a medida que los vaya cargando un médico autorizado.</h2>
            </div>
          </div>

        )
    );
  }
}
