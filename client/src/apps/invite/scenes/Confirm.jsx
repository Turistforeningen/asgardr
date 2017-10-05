import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import queryString from 'query-string';

import {fetchInvite, acceptInvite} from '../actions/index.js';

class Confirm extends Component {
  componentDidMount() {
    const {code} = this.props;

    this.props.fetchInvite(code);
  }

  @autobind
  acceptInvite() {
    const {code, invite, user} = this.props;

    this.props.acceptInvite(invite, user);
  }

  render() {
    const {code, invite, user, isFetching} = this.props;

    if (isFetching) {
      return null;
    } else if (user.isAuthenticated !== true) {
      return (
        <div>
          Du er ikke logget inn. Gå til <a href={`/invitasjon?kode=${code}`}>invitasjonen</a>{' '}
          for å starte på nytt.
        </div>
      );
    }

    const group = invite.data.gruppe;

    return (
      <div>
        <h1>Bekreft</h1>
        <div>{user.data.fornavn} {user.data.etternavn} {user.data.epost} vil bli lagt til i gruppen {group.navn}.</div>
        <div><button type="button" onClick={this.acceptInvite}>Bekreft</button></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.user.isFetching || state.invite.isFetching,
  code: queryString.parse(ownProps.location.search).kode,
  invite: state.invite,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  acceptInvite: function dispatchAcceptInvite(invite, user) {
    dispatch(acceptInvite(invite.data.kode, invite.data.gruppe, user.data));
  },
  fetchInvite: function dispacthFetchInvite(code) {
    dispatch(fetchInvite(code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
