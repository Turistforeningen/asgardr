import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Dimmer, Divider, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import {fetchTurbasenUser, userConvert} from '../../actions/conversion.js';

import Turbasen from './Turbasen.jsx';
import Confirm from './Confirm.jsx';

class Conversion extends Component {
  componentDidMount() {
    const {session} = this.props;
    const {turbasen: turbasenUser} = session.data;

    this.props.fetchTurbasenUser(turbasenUser.epost, turbasenUser.gruppe._id);
  }

  render() {
    const {conversion, session} = this.props;


    if (conversion.isFetching === true) {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <Segment padded stacked style={{minHeight: '120px'}}>
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            </Segment>
          </Grid.Column>
        </Grid>
      );
    } else if (typeof conversion.from === 'undefined') {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <h3>Feil 403</h3>
            <p>
              Her havnet du trolig ved en feil.{' '}
              <a href="/">Gå til forsiden</a>{' '}
              for å finne frem dit du skulle.
            </p>
          </Grid.Column>
        </Grid>
      );
    } else if (conversion.error) {
      return (
        <Segment basic>
          <Header as="h2">Feil</Header>
          <Message error>{invite.error.message}</Message>
          <Header as="h3">Veier videre</Header>
          <Button primary fluid>Logg inn</Button>
          <Divider horizontal>Eller</Divider>
          <Button color="grey" fluid as="a" href="mailto:ut@dnt.no">
            Ta kontakt med hjelp
          </Button>
        </Segment>
      );
    } else if (conversion.isFetched === true) {
      return (
        <Switch basename="/bruker/konverter">
          <div>
            <Route exact path="/turbasen" render={(props) => (
              <Turbasen {...props}
                conversion={conversion}
              />
            )} />
            <Route exact path="/bekreft" render={(props) => (
              <Confirm {...props}
                conversion={conversion}
                user={session.data.user}
                userConvert={this.props.userConvert}
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
  isFetching: state.conversion.isFetching,
  session: state.session,
  conversion: state.conversion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTurbasenUser: function dispatchFetchTurbasenUser(email, group) {
    dispatch(fetchTurbasenUser(email, group));
  },
  userConvert: function dispatchUserConvert(group, turbasenUser, dntUser) {
    console.log('abcddd');
    dispatch(userConvert(group, turbasenUser, dntUser));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversion);
