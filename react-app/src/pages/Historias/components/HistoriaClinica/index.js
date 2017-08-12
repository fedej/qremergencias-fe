import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
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
        { historia.files[0] &&
        <CardMedia expandable>
          <img
            src={historia.files[0]}
            alt=""
          />
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
        </CardActions>
      </Card>
    );
  }
}
