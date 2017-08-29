import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

import { fetchHistoriasClinicasDePaciente, deleteHistoriaClinica } from '../../../../store/Historias';

const icono = require('./medicine-bowl-icon.png');

function downloadFile(url) {
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = url;
  link.click();
  link.remove();
}

class HistoriaClinica extends Component {
  static propTypes = {
    historia: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      performed: PropTypes.string.isRequired,
      text: PropTypes.string,
      files: PropTypes.array,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  };

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle });
  };

  handleExpand = () => {
    this.setState({ expanded: true });
  };

  handleReduce = () => {
    this.setState({ expanded: false });
  };

  handleDelete = (id) => {
    const { dispatch, paciente } = this.props;
    // TODO: traer del store
    const token = '1234';
    dispatch(deleteHistoriaClinica(id));
    dispatch(fetchHistoriasClinicasDePaciente(paciente, token));
  };

  render() {
    const { historia } = this.props;
    const fecha = moment(historia.performed).format('DD / MM / YYYY');

    const file = historia.files[0];
    let viewer;

    if (file) {
      if (file.mimeType.includes('image')) {
        viewer = <img src={file.url} alt="Imagen" />;
      } else if (file.mimeType.includes('pdf')) {
        viewer = (
          <RaisedButton
            href={`${file.url}.pdf`}
            target="_blank"
            label="Descargar"
            primary
          />
        );
      } else {
        viewer = (
          <RaisedButton
            label="Descargar"
            primary
            onTouchTap={() => downloadFile(file.url)}
          />
        );
      }
    }

    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={{ width: '100%', marginTop: '20px' }}
      >
        <CardHeader
          title={historia.name}
          subtitle={fecha}
          avatar={icono}
          actAsExpander
          showExpandableButton
        />
        { historia.files[0] &&
        <CardMedia expandable>
          <div>
            {viewer}
          </div>
        </CardMedia>
        }
        <CardText expandable>
          {historia.text}
        </CardText>
        <CardActions>
          {
            this.state.expanded ? (
              <FlatButton label="Cerrar" onTouchTap={this.handleReduce} />
            ) : (
              <FlatButton label="Ver" onTouchTap={this.handleExpand} />
            )
          }

          {
            this.props.isMedico ? (
              <FlatButton label="Borrar" onTouchTap={() => this.handleDelete(historia.id)} />)
              : ''
          }
        </CardActions>
      </Card>
    );
  }
}

export default connect(state => ({
  historias: state.historias.todas,
  paciente: state.paciente.editando,
  isMedico: state.auth.isMedico,
}))(HistoriaClinica);
