import React from 'react';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

const InviteIndex = ({invite, isAuthenticated, user}) => (
  <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
    <Grid.Column style={{maxWidth: 450}}>
      <Segment padded stacked style={{minHeight: '120px'}}>
        <Header as="h2">Bli med i {invite.data.gruppe.navn} på UT.no</Header>
        <p>
          Du er invitert til å bli å bli en del av gruppa {' '}
          {invite.data.gruppe.navn} på UT.no.
        </p>
        {(() => {
          if (isAuthenticated) {
            return (
              <div>
                <p>
                  For å få tilgang til gruppas innhold på UT.no må din{' '}
                  DNT-bruker legges til i gruppa.
                </p>
                <Message info>
                  Du er logget inn som {' '}
                  <strong>{user.fornavn} {user.etternavn}</strong>,
                  med epost <strong>{user.epost}</strong>. {' '}
                  Gå videre hvis dette er brukeren som skal legges til i gruppa.
                </Message>
                <Button
                  as="a"
                  size="big"
                  color="blue"
                  fluid
                  href={`/invitasjon/bekreft?kode=${invite.data.kode}`}
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
                href={`/logg-inn/dnt?next=/invitasjon/bekreft?kode=${invite.data.kode}`}
              >
                Gå videre
              </Button>
            </div>
          );
        })()}
      </Segment>
    </Grid.Column>
  </Grid>
);

export default InviteIndex;
