import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Dimmer, Divider, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';

import {fetchInvite} from '../actions/index.js';

class Invite extends Component {
  componentDidMount() {
    this.props.fetchInvite(this.props.code);
  }

  render() {
    const {invite, user, isFetching, code} = this.props;

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Segment padded stacked style={{minHeight: '120px'}}>
            {(() => {
              if (isFetching) {
                return (
                <Dimmer active inverted>
                  <Loader content="Henter invitasjon..." />
                </Dimmer>
                );
              } else if (invite.error) {
                return (
                  <Segment basic>
                    <Header as="h2">Feil ved henting av invitasjon</Header>
                    <Message error>{invite.error.message}</Message>
                    <Header as="h3">Veier videre</Header>
                    <Button primary fluid>Logg inn</Button>
                    <Divider horizontal>Eller</Divider>
                    <Button color="grey" fluid as="a" href="mailto:ut@dnt.no">Ta kontakt med hjelp</Button>
                  </Segment>
                );
              } else if (invite.isFetched) {
                return (
                  <div>
                    <Header as="h2">Bli med i {invite.data.gruppe.navn} på UT.no</Header>
                    <p>
                      Du er invitert til å bli å bli en del av gruppa {invite.data.gruppe.navn} {' '}
                      på UT.no.
                    </p>
                    {(() => {
                      if (user && user.isAuthenticated) {
                        return (
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
                        );
                      }

                      return (
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
                            Gå videre
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }

              return null;
            })()}
          </Segment>
        </Grid.Column>
      </Grid>
    );
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
