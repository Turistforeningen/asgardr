import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import queryString from 'query-string';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

import {fetchInvite, acceptInvite} from '../actions/index.js';

class Confirm extends Component {
  componentDidMount() {
    const {code} = this.props;

    this.props.fetchInvite(code);
  }

  @autobind
  acceptInvite() {
    const {invite, user} = this.props;

    this.props.acceptInvite(invite, user);
  }

  render() {
    const {code, invite, user, isFetching} = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Segment stacked>
            <Header as="h2">Invitasjon til {invite.data.gruppe.navn}</Header>
            {
              user && user.isAuthenticated ?
                <div>
                  <p>
                    Når du har{' '}
                    koblet brukeren din til gruppen får du tilgang til gruppens innhold i{' '}
                    Nasjonal Turbase.
                  </p>
                  <p>
                    Kontroller nedenfor at du er logget inn som riktig bruker, og trykk bekreft.
                  </p>
                  <Message success>
                    Du er logget inn som {' '}
                    <strong>{user.data.fornavn} {user.data.etternavn}</strong>,
                    med epost <strong>{user.data.epost}</strong>. {' '}
                  </Message>
                  {
                    invite.errors && invite.errors.length &&
                    <Message error>
                      {invite.errors.map(error => (
                        <p key={error}>{error}</p>
                      ))}
                    </Message>
                  }
                  <Button
                    as="a"
                    size="big"
                    color="green"
                    fluid
                    onClick={this.acceptInvite}
                  >
                    Bekreft
                  </Button>
                </div>
              :
                <div>
                  <Message error>
                    Du er ikke logget inn. For å bli med i gruppen må du være innlogget med en{' '}
                    DNT-bruker.
                  </Message>
                  <Button
                    as="a"
                    size="big"
                    color="blue"
                    fluid
                    href={`/logg-inn?next=/invitasjon/bekreft?kode=${code}`}
                  >
                    Logg inn
                  </Button>
                </div>
            }
          </Segment>
          <Segment basic>
            {
              user && user.isAuthenticated &&
              <p>
                Ikke riktig bruker? Da må du først{' '}
                <a href="https://www.dnt.no/minside/logg-ut">logge ut</a>,{' '}
                for så å følge lenken i epost-invitasjonen på nytt.
              </p>
            }
          </Segment>
        </Grid.Column>
      </Grid>
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
