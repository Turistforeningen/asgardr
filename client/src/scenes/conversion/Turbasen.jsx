import React from 'react';
import {Button, Grid, Header, Icon, Message, Segment} from 'semantic-ui-react';

const Turbasen = ({conversion}) => (
  <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
    <Grid.Column style={{maxWidth: 450}}>
      {
        conversion.isConverted ? // eslint-disable-line no-nested-ternary
          <Segment padded stacked textAlign="left">
            <Header>
              Hei, {conversion.from.navn}
            </Header>
            <p>
              Denne innloggingen er ikke lenger i bruk. Du må logge inn {' '}
              med din DNT-bruker med epostadressen {conversion.to.epost}.
            </p>
            <p>
              Neste gang du skal logge inn skal du velge {' '}
              «Logg inn med DNT-bruker».
            </p>
            <Button
              as="a"
              size="big"
              color="red"
              fluid
              href="/logg-inn/dnt"
            >
              Logg inn med DNT-bruker
            </Button>
          </Segment>
            :
          <Grid style={{height: '100%'}}>
            <Grid.Column style={{maxWidth: 450}}>
              {
                conversion.isConverted ? // eslint-disable-line no-nested-ternary
                  <Segment padded stacked>
                    <h2>Hei, {conversion.from.navn}</h2>
                    <Message info>
                      <p>
                        Denne innloggingen er ikke lenger i bruk. Du kan logge inn ved å{' '}
                        klikke på knappen nedenfor og oppgi epostadressen{' '}
                        {conversion.to.epost} og ditt{' '}
                        passord.
                      </p>
                      <p>
                        Fra nå av må du logge inn med DNT-bruker.{' '}
                      </p>
                    </Message>
                    <Button
                      as="a"
                      href="/logg-inn/dnt"
                      icon="user"
                      labelPosition="left"
                      content="Logg inn"
                      color="grey"
                      size="huge"
                    />
                  </Segment>
                    :
                  <Segment padded stacked textAlign="left">
                    <Header>
                      Hei, {conversion.from.navn}
                    </Header>
                    <p>
                      Vi har fått ny innlogging – du må oppdatere brukeren din!
                    </p>
                    <Segment>
                      <Header size="medium" disabled>
                        <Icon circular name="user remove" />
                        <Header.Content>
                          Gammel bruker
                          <Header.Subheader>
                            Ikke lenger i bruk
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                      <p>
                        Du har logget inn med brukeren {conversion.from.epost} i{' '}
                        {conversion.group.navn} sin gruppe på UT.no.{' '}
                        Denne innloggingen er ikke lenger i bruk.
                      </p>
                    </Segment>
                    <Segment>
                      <Header size="medium">
                        <Icon circular name="user add" color="red" />
                        <Header.Content>
                          Ny bruker
                          <Header.Subheader>
                            Logg inn med DNT-bruker
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                      <p>
                        For å få tilgang til {conversion.group.navn}{' '}
                        sin gruppe på UT.no må du heretter logge inn med en{' '}
                        DNT-bruker.{' '}
                        Hvis du allerede har en kan du bruke den.{' '}
                        Ellers kan du enkelt opprette en,{' '}
                        helt gratis. Du trenger ikke være medlem av DNT.{' '}
                      </p>
                      <p>
                        Din DNT-bruker er personlig. Du må derfor bruke{' '}
                        eget navn og egen e-postadresse når du oppretter{' '}
                        ny konto. Brukeren vil så bli tilknyttet{' '}
                        {conversion.group.navn} på neste steg.{' '}
                      </p>
                      <Button
                        as="a"
                        size="big"
                        color="red"
                        fluid
                        href={'/logg-inn/dnt?next=/bruker/konverter/bekreft'}
                      >
                        Logg inn med DNT-bruker
                      </Button>
                    </Segment>
                  </Segment>
                }
            </Grid.Column>
          </Grid>
        }
    </Grid.Column>
  </Grid>
);

export default Turbasen;
