import React from 'react';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

const Confirm = ({invite, isAuthenticated, user, acceptInvite}) => (
  <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
    <Grid.Column style={{maxWidth: 450}}>
      {(() => {
        if (isAuthenticated !== true) {
          return (
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
                href={`/logg-inn/dnt?next=/invitasjon/bekreft?kode=${invite.data.kode}`}
              >
                Logg inn
              </Button>
            </Segment>
          );
        } else if (invite.isAccepted === true) {
          return (
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
          );
        }

        return (
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
                  Kontroller nedenfor at du er logget inn som riktig{' '}
                  bruker, og trykk bekreft for å koble din DNT-bruker til{' '}
                  gruppa {invite.data.gruppe.navn} på UT.no.
                </p>
                <Message success>
                  Du er logget inn som {' '}
                  <strong>{user.fornavn} {user.etternavn}</strong>,
                  med epost <strong>{user.epost}</strong>. {' '}
                </Message>
                <p>
                  Ikke riktig bruker? Da må du først{' '}
                  <a href="https://www.dnt.no/minside/logg-ut">logge ut</a>,{' '}
                  for deretter å følge lenken i epost-invitasjonen på nytt.
                </p>
                <Button
                  as="a"
                  size="big"
                  color="green"
                  fluid
                  onClick={() => { acceptInvite(invite, user); }}
                >
                  Bekreft
                </Button>
              </div>
            }
            {
              invite.errors && invite.errors.length &&
              <Message error>
                {invite.errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </Message>
            }
          </Segment>
        );
      })()}
    </Grid.Column>
  </Grid>
);

export default Confirm;
