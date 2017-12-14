import React from 'react';
import {Segment} from 'semantic-ui-react';

const ConvertSuccess = ({turbasenUser, dntUser}) => (
  <Segment padded stacked textAlign="left">
    <h2>Gratulerer!</h2>
    <p>
      Du er nå i mål. Neste gang du skal logge inn på UT går du til{' '}
      <a href="https://admin.nasjonalturbase.no">https://admin.nasjonalturbase.no</a>{' '}
      og velger «Logg inn med DNT-bruker». Husk å oppdatere bokmerkene dine!
    </p>
    <p>
      Nå kan du gå videre til f.eks.{' '}
      <a href="https://tur.app.dnt.no">turforslag</a> eller{' '}
      <a href="https://hytte.app.dnt.no">hytter</a>.
    </p>
  </Segment>
);

export default ConvertSuccess;
