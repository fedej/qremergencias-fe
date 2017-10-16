import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './styles.css';

import Home from '../Home';

class HomePage extends React.Component {

  static propTypes = {
    isMedico: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Home>
        <div className={classnames('formCenter')}>
          {
            this.props.isMedico ? (
              <div>
                <h1>Bienvenido a QR Emergencias!</h1>
                <h2>Como médico podrás realizar las siguientes acciones desde el menú:</h2>
                <p>Ver y editar tu perfil.</p>
                <p>Modificar los datos de emergencia de un paciente.</p>
                <p>Cargar estudios médicos.</p>
              </div>
            ) : (
              <div>
                <h1>Bienvenido a QR Emergencias!</h1>
                <h2>Como paciente podrás realizar las siguientes acciones desde el menú:</h2>
                <p>Ver y editar tu perfil.</p>
                <p>Gestionar el QR con el que podrán acceder a tus datos de emergencia.</p>
                <p>Acceder a tu historia clínica.</p>
                <p>Ver tus datos de emergencia.</p>
                <p>Ver los cambios realizados por médicos sobre tu perfil.</p>
              </div>
            )
          }
        </div>
      </Home>
    );
  }
}

export default connect(state => ({
  isMedico: state.auth.isMedico,
}))(HomePage);
