import React from 'react';
import {Button, Message, Segment} from 'semantic-ui-react';

const ConvertConfirm = ({turbasenUser, dntUser, group, userConvert, errors}) => (
  <Segment padded stacked>
    <p>
      Kontroller nedenfor at du er logget inn som riktig bruker, og trykk{' '}
      bekreft for å koble din DNT-bruker til gruppa {group.navn} {' '}
      på UT.no.
    </p>
    <p>
      Etter dette vil du måtte logge på UT.no med din DNT-bruker i stedet{' '}
      for ditt gamle brukernavn og passord.
    </p>
    <Message success>
      Du er logget inn som {' '}
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
      as="a"
      size="big"
      color="blue"
      fluid
      onClick={userConvert}
    >
      Gå videre
    </Button>
  </Segment>
);

export default ConvertConfirm;
