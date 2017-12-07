import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

import {fetchTurbasenUser, userConvert} from '../../actions/convert.js';

import ConvertConfirm from '../../components/users/ConvertConfirm.jsx';
import ConvertSuccess from '../../components/users/ConvertSuccess.jsx';

class Convert extends Component {
  componentDidMount() {
    const {session} = this.props;
    const {turbasen: turbasenUser} = session.data;

    this.props.fetchTurbasenUser(turbasenUser.epost, turbasenUser.gruppe._id);
  }

  @autobind
  userConvert() {
    const {session} = this.props;
    const {turbasen, user} = session.data;

    this.props.userConvert(turbasen, user);
  }

  render() {
    const {conversion, session, isFetching} = this.props;

    if (isFetching || !conversion.isFetched) {
      return null;
    }

    const turbasenUser = conversion.from;
    const errors = conversion.errors;

    if (typeof turbasenUser === 'undefined') {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <h3>Feil 403</h3>
            <p>Her havnet du trolig ved en feil. <a href="/">Gå til forsiden</a> for å finne frem dit du skulle.</p>
          </Grid.Column>
        </Grid>
      );
    }

    const dntUser = session.data.user;
    const group = conversion.group;

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          {
            conversion.isConverted ?
            <ConvertSuccess
              turbasenUser={turbasenUser}
              dntUser={dntUser}
            />
              :
            <ConvertConfirm
              turbasenUser={turbasenUser}
              dntUser={dntUser}
              group={group}
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
  fetchTurbasenUser: function dispatchFetchTurbasenUser(email, group) {
    dispatch(fetchTurbasenUser(email, group));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Convert);
