import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

import {fetchInvite} from '../actions/index.js';

class Invite extends Component {
  componentDidMount() {
    this.props.fetchInvite(this.props.code);
  }

  render() {
    const {invite, user, isFetching, code} = this.props;

    if (typeof this.props.code === 'undefined') {
      return <div>Invitasjonskode mangler.</div>;
    } else if (isFetching) {
      return (
        <div>Henter invitasjon...</div>
      );
    } else if (invite.error) {
      return (
        <Message error>{invite.error.message}</Message>
      );
    } else if (invite.isFetched) {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
          <Grid.Column style={{maxWidth: 450}}>
            <Segment stacked>
              <Header as="h2">Bli med i {invite.data.gruppe.navn} på UT.no</Header>
              <p>
                Du er invitert til å bli å bli en del av gruppa {invite.data.gruppe.navn} {' '}
                på UT.no.
              </p>
              {
                user && user.isAuthenticated ?
                  <div>
                    <p>
                      For å få tilgang til gruppas innhold på UT.no må din DNT-bruker legges{' '}
                      til i gruppa.
                    </p>
                    <Message info>
                      Du er logget inn som {' '}
                      <strong>{user.data.fornavn} {user.data.etternavn}</strong>,
                      med epost <strong>{user.data.epost}</strong>. {' '}
                      Gå videre hvis dette er brukeren som skal legges til i gruppen.
                    </Message>
                    <Button
                      as="a"
                      size="big"
                      color="blue"
                      fluid
                      href={`/invitasjon/bekreft?kode=${code}`}
                    >
                      Gå videre
                    </Button>
                  </div>
                :
                  <div>
                    <p>
                      For å få tilgang til gruppas innhold på UT.no må du logge inn med {' '}
                      din DNT-bruker. Hvis du ikke har en DNT-bruker kan du enkelt opprette en {' '}
                      gratis. Du trenger ikke være medlem av DNT for å registrere en bruker.
                    </p>
                    <Button
                      as="a"
                      size="big"
                      color="blue"
                      fluid
                      href={`/logg-inn?next=/invitasjon/bekreft?kode=${code}`}
                    >
                      Gå videre for å logge inn eller registrere bruker
                    </Button>
                  </div>
              }
            </Segment>
            <Segment basic>
              {
                user && user.isAuthenticated &&
                <p>
                  Ikke deg? Da må du <a href="https://www.dnt.no/logg-ut">logge ut</a> først for å koble riktig bruker til gruppen.
                </p>
              }
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.user.isFetching || state.invite.isFetching,
  code: queryString.parse(ownProps.location.search).kode,
  user: state.user,
  invite: state.invite,
});

const mapDispatchToProps = dispatch => ({
  fetchInvite: function dispacthFetchInvite(code) {
    dispatch(fetchInvite(code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
