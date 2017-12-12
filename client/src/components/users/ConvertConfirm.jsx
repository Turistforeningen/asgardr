import React from 'react';
import {Button, Header, Icon, Message, Segment} from 'semantic-ui-react';

const ConvertConfirm = ({turbasenUser, dntUser, group, userConvert, errors}) => (
  <Segment padded stacked textAlign="left">
    <Header>
      Nesten i mål!
    </Header>
    <p>
      Bekreft at du er logget inn med riktig DNT-bruker, så er alt {' '}
      klart for å ta i bruk den nye innloggingen.
    </p>
    <Segment>
      <Header size="medium">
        <Icon circular name="user add" color="red" />
        <Header.Content>
          DNT-bruker
          <Header.Subheader>
            Ny innlogging
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Message>
        Du er logget inn som{' '}
        <strong>{dntUser.fornavn} {dntUser.etternavn}</strong>,
        med epost <strong>{dntUser.epost}</strong>.
      </Message>
      {
        errors && errors.length &&
        <Message error>
          {errors.map((error) => (
            <p key={error.replace(' ', '')}>{error}</p>
          ))}
        </Message>
      }
      <Button
        size="big"
        color="red"
        fluid
        onClick={userConvert}
      >
        Bekreft
      </Button>
    </Segment>
  </Segment>
);

export default ConvertConfirm;
