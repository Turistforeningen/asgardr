import React from 'react';
import {Button, Form, Grid, Message, Segment} from 'semantic-ui-react';

const LoginTurbasen = ({error}) => (
  <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
    <Grid.Column style={{maxWidth: 450}}>
      <Segment padded stacked style={{minHeight: '120px'}}>
        {
          error && error === 'TBAUTH-401' &&
          <Message error>
            Du har oppgitt feil epost eller passord. Prøv igjen, og ta kontakt med oss dersom du har glemt e-post eller passord.
          </Message>
        }
        <Form size="large" action="/logg-inn/turbasen" method="POST">
          <Form.Input
            type="text"
            name="email"
            icon="user"
            iconPosition="left"
            placeholder="E-post"
          />
          <Form.Input
            type="password"
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Passord"
          />
          <Button fluid type="submit" color="blue" size="large">
            Logg inn
          </Button>
        </Form>
      </Segment>
    </Grid.Column>
  </Grid>
);

export default LoginTurbasen;
