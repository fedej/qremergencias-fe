import React from 'react';
import { browserHistory } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import classnames from 'classnames';

import '../../styles.css';

export default function RegisterSuccess() {
  setTimeout(() => {
    browserHistory.push('/login');
  }, 3000);

  return (
    <div className={classnames('formCenter', 'formSuccess')}>
      <Card>
        <CardTitle title="Te registraste con éxito!" />
        <CardText style={{ textAlign: 'center' }}>
          <img src="http://osmhotels.com//assets/check-true.jpg" alt="Logo" />
          <p style={{ marginTop: '20px' }}>
            Gracias por registrarte, te enviamos un mail a tu casilla de correo,
            confirma tu cuenta por favor.
          </p>
        </CardText>
      </Card>
    </div>
  );
}
