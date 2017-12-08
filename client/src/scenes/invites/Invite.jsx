import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Dimmer, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import {acceptInvite, fetchInvite} from '../../actions/invites.js';

import InviteIndex from './Index.jsx';
import Confirm from './Confirm.jsx';

class Invite extends Component {
  componentDidMount() {
    this.props.fetchInvite(this.props.code);
  }

  render() {
    const {invite, session} = this.props;

    if (invite.isFetched !== true) {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <Segment padded stacked style={{minHeight: '120px'}}>
              <Dimmer active inverted>
                <Loader content="Henter invitasjon..." />
              </Dimmer>
            </Segment>
          </Grid.Column>
        </Grid>
      );
    } else if (invite.error) {
      return (
        <Segment basic>
          <Header as="h2">Feil ved henting av invitasjon</Header>
          <Message error>{invite.error.message}</Message>
          <Header as="h3">Veier videre</Header>
          <Button primary fluid>Logg inn</Button>
          <Divider horizontal>Eller</Divider>
          <Button color="grey" fluid as="a" href="mailto:ut@dnt.no">
            Ta kontakt med hjelp
          </Button>
        </Segment>
      );
    } else if (invite.isFetched === true) {
      return (
        <Switch basename="/invitasjon">
          <div>
            <Route exact path="/" render={(props) => (
              <InviteIndex {...props}
                invite={invite}
                acceptInvite={this.props.acceptInvite}
                isAuthenticated={session.isAuthenticated}
                user={session.data.user}
              />
            )} />
            <Route exact path="/bekreft" render={(props) => (
              <Confirm {...props}
                invite={invite}
                acceptInvite={this.props.acceptInvite}
                isAuthenticated={session.isAuthenticated}
                user={session.data.user}
              />
            )} />
          </div>
        </Switch>
      );
    }

    return (
      <Message error>Ukjent feil.</Message>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: !state.invite || state.invite.isFetching,
  code: queryString.parse(ownProps.location.search).kode,
  session: state.session,
  invite: state.invite,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInvite: function dispacthFetchInvite(code) {
    dispatch(fetchInvite(code));
  },
  acceptInvite: function dispatchAcceptInvite(invite, user) {
    dispatch(acceptInvite(invite.data.kode, invite.data.gruppe, user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
