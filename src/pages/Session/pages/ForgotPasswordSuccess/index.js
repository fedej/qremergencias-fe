import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import '../../styles.css';

const icon = require('../success.png');

export default class RegisterSuccess extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      browserHistory.push('/login');
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className={classnames('formCenter', 'formSuccess')}>
        <Card>
          <CardTitle title="Revisá tu email" />
          <CardText style={{ textAlign: 'center' }}>
            <img src={icon} alt="Logo" />
            <p style={{ marginTop: '20px' }}>
              Te enviamos un email con instrucciones para restablecer tu contraseña
            </p>
          </CardText>
        </Card>
      </div>
    );
  }
}
