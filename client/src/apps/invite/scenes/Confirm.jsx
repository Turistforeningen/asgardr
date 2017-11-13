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
          {
            user && user.isAuthenticated ? // eslint-disable-line no-nested-ternary
              invite && invite.isAccepted ?
                <Segment padded stacked>
                  <Header as="h2">Du er med!</Header>
                  <p>
                    Gratulerer! Du er nå medlem av {invite.data.gruppe.navn} og har{' '}
                    tilgang til å redigere gruppa sitt innhold på UT.no.
                  </p>
                  <p>
                    Gå til f.eks. <a href="https://tur.app.dnt.no">turforslag</a> eller{' '}
                    <a href="https://hytte.app.dnt.no">hytter</a>.
                  </p>
                </Segment>
                :
                <Segment padded stacked>
                  {
                    invite.data.brukt ?
                    <Message error>
                      Invitasjonskoden er allerede brukt. Den er koblet til{' '}
                      DNT-bruker med epost-adresse {invite.data.brukt_av.epost}.{' '}
                      Hvis dette er deg kan du logge inn for å få{' '}
                      tilgang til innholdet ditt. Ellers må du få en{' '}
                      ny invitasjonskode, for å bli medlem i gruppa.
                    </Message>
                    :
                    <div>
                      <Header as="h2">Bekreft brukeropplysninger</Header>
                      <p>
                        Kontroller nedenfor at du er logget inn som riktig bruker, og trykk{' '}
                        bekreft for å koble din DNT-bruker til gruppa {invite.data.gruppe.navn}{' '}
                        på UT.no.
                      </p>
                      <Message success>
                        Du er logget inn som {' '}
                        <strong>{user.data.fornavn} {user.data.etternavn}</strong>,
                        med epost <strong>{user.data.epost}</strong>. {' '}
                      </Message>
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
                  }
                  {
                    invite.errors && invite.errors.length &&
                    <Message error>
                      {invite.errors.map(error => (
                        <p key={error}>{error}</p>
                      ))}
                    </Message>
                  }
                </Segment>
              :
              <Segment padded stacked>
                <Header as="h2">Ikke logget inn</Header>
                <Message error>
                  Du er ikke logget inn. For å bli med i gruppen må du være innlogget med en{' '}
                  DNT-bruker.
                </Message>
                <Button
                  as="a"
                  size="big"
                  color="blue"
                  fluid
                  href={`/logg-inn/dnt?next=/invitasjon/bekreft?kode=${code}`}
                >
                  Logg inn
                </Button>
              </Segment>
            }
          <Segment basic>
            {
              user && user.isAuthenticated &&
              <p>
                Ikke riktig bruker? Da må du først{' '}
                <a href="https://www.dnt.no/minside/logg-ut">logge ut</a>,{' '}
                for deretter å følge lenken i epost-invitasjonen på nytt.
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
