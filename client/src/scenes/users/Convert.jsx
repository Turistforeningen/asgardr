import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

import {userConvert} from '../../actions/convert.js';

import ConvertConfirm from '../../components/users/ConvertConfirm.jsx';
import ConvertSuccess from '../../components/users/ConvertSuccess.jsx';

class Convert extends Component {
  @autobind
  userConvert() {
    const {session} = this.props;
    const {turbasen, user} = session.data;

    this.props.userConvert(turbasen, user);
  }

  render() {
    const {conversion, session, isFetching} = this.props;

    if (isFetching) {
      return null;
    }

    const turbasenUser = session.data.turbasen;
    const errors = conversion.errors;

    if (typeof turbasenUser === 'undefined') {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <h3>Kode 400</h3>
            <p>Du må logge inn med en Turbasen-bruker for å konvertere.</p>
          </Grid.Column>
        </Grid>
      );
    }

    const dntUser = session.data.user;

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          {
            turbasenUser.konvertert ?
            <ConvertSuccess
              turbasenUser={turbasenUser}
              dntUser={dntUser}
            />
              :
            <ConvertConfirm
              turbasenUser={turbasenUser}
              dntUser={dntUser}
              userConvert={this.userConvert}
              errors={errors}
            />
          }
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.session.isFetching,
  session: state.session,
  conversion: state.convert,
});

const mapDispatchToProps = dispatch => ({
  userConvert: function dispatchUserConvert(turbasen, user) {
    dispatch(userConvert(turbasen, user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Convert);
