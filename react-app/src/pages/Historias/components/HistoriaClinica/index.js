import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const icono = require('./medicine-bowl-icon.png');

export default class HistoriaClinica extends Component {
  static propTypes = {
    historia: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      detalle: PropTypes.string,
      archivo: PropTypes.string,
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

    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        style={{ width: '100%', marginTop: '20px' }}
      >
        <CardHeader
          title={historia.nombre}
          subtitle={historia.fecha}
          avatar={icono}
          actAsExpander
          showExpandableButton
        />
        <CardMedia
          expandable
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img
            src={historia.archivo}
            alt=""
          />
        </CardMedia>
        <CardText expandable>
          {historia.detalle}
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
