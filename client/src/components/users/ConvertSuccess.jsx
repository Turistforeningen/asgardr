import React from 'react';
import {Button, Message, Segment} from 'semantic-ui-react';

const ConvertSuccess = ({turbasenUser, dntUser}) => (
  <Segment padded stacked>
    <h2>Gratulerer!</h2>
    <p>
      Du er nå i mål. Neste gang du skal logge inn på UT velger du {' '}
      «Logg inn med DNT-bruker».
    </p>
    <p>
      Gå til f.eks. <a href="https://tur.app.dnt.no">turforslag</a> eller{' '}
      <a href="https://hytte.app.dnt.no">hytter</a>.
    </p>
  </Segment>
);

export default ConvertSuccess;
