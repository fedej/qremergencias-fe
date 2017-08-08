import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

const icono = require('./medicine-bowl-icon.png');

export default class HistoriaClinica extends Component {
  static propTypes = {
    historia: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      performed: PropTypes.string.isRequired,
      text: PropTypes.string,
      files: PropTypes.array,
    }).isRequired,
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

  render() {
    const { historia } = this.props;


    let url = 'http://2.bp.blogspot.com/_rA5gQI4magc/TTNttosjLZI/AAAAAAAACc0/RYOji7Gj6AE/s1600/Historia_Clinica_Neurologica+1.png';

    if (historia.files[0]) {
      url = 'http://localhost:8082/qremergencias/api/medicalRecord/file/' + historia.files[0];
    }

    // TODO: mostrar archivos
    // historia.files
    const fecha = moment(historia.performed).format('DD / MM / YYYY');

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
        <CardMedia expandable>
          <img
            src={url}
            alt=""
          />
        </CardMedia>
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
        </CardActions>
      </Card>
    );
  }
}
