import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';

import ConvertConfirm from '../../components/users/ConvertConfirm.jsx';
import ConvertSuccess from '../../components/users/ConvertSuccess.jsx';

const Confirm = ({user, conversion, userConvert}) => (
  <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
    <Grid.Column style={{maxWidth: 450}}>
      {
        conversion.isConverted ?
        <ConvertSuccess
          turbasenUser={conversion.from}
          dntUser={user}
        />
          :
        <ConvertConfirm
          turbasenUser={conversion.from}
          dntUser={user}
          group={conversion.group}
          userConvert={userConvert}
          errors={conversion.errors}
        />
      }
    </Grid.Column>
  </Grid>
);

export default Confirm;
