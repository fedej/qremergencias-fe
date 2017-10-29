import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './styles.css';

import Home from '../Home';


const iconMenuProfile = require('../../assets/icons/profile_menu.png');
const iconMenuQR = require('../../assets/icons/qr_menu.png');
const iconMenuEmergencyData = require('../../assets/icons/emergency_data_menu.png');
const iconMenuRecords = require('../../assets/icons/records_menu.png');
const iconMenuEdit = require('../../assets/icons/edit_menu.png');
const iconMenuChanges = require('../../assets/icons/changes_menu.png');

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
              <div style={{ padding: '20px' }}>
                <h1>¡Bienvenido a QR Emergencias!</h1>
                <h2>Como médico podrás realizar las siguientes acciones desde el menú:</h2>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuProfile} />
                      Ver y editar tu <strong>perfil</strong>.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuEmergencyData} />
                      Modificar los <strong>datos de emergencia</strong> de un paciente.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuEdit} />
                      Cargar <strong>estudios médicos</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px' }}>
                <h1>¡Bienvenido a QR Emergencias!</h1>
                <h2>Como paciente podrás realizar las siguientes acciones desde el menú:</h2>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuProfile} />
                      Ver y editar tu <strong>perfil</strong>.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuQR} />
                      Gestionar el <strong>QR</strong>
                       con el que podrán acceder a tus datos de emergencia.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuRecords} />
                      Acceder a tu <strong>historia clínica</strong>.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuEmergencyData} />
                      Ver tus <strong>datos de emergencia</strong>.
                  </span>
                </div>
                <div className={classnames('datadiv')}>
                  <span>
                    <img alt="" src={iconMenuChanges} />
                      Ver los <strong>cambios realizados</strong> por médicos sobre tu perfil.
                  </span>
                </div>
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
