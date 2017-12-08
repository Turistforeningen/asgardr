import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Message, Segment} from 'semantic-ui-react';

import {fetchTurbasenUser} from '../../actions/convert.js';

class Turbasen extends Component {
  componentDidMount() {
    const {session} = this.props;
    const {turbasen: turbasenUser} = session.data;

    this.props.fetchTurbasenUser(turbasenUser.epost, turbasenUser.gruppe._id);
  }

  render() {
    const {conversion, session, isFetching} = this.props;

    if (isFetching) {
      return null;
    } else if (conversion.isFetched || conversion.errors) {
      return (
        <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
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
                      Neste gang du skal logge inn skal du velge «Logg inn med DNT-bruker».
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
                <Segment padded stacked>
                  <h2>Hei, {session.data.turbasen.navn}</h2>
                  <p>
                    Vi har gått over fra innlogging med eget brukernavn og passord for{' '}
                    {conversion.group.navn}, til innlogging med DNT-bruker.
                  </p>
                  <p>
                    For å fortsette må du derfor logge inn med{' '}
                    eller opprette en DNT-bruker.
                  </p>
                  <Button
                    as="a"
                    size="big"
                    color="blue"
                    fluid
                    href={'/logg-inn/dnt?next=/bruker/konverter'}
                  >
                    Gå videre
                  </Button>
                </Segment>
              }
          </Grid.Column>
        </Grid>
      );
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.user.isFetching || state.convert.isFetching,
  session: state.session,
  conversion: state.convert,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTurbasenUser: function dispatchFetchTurbasenUser(email, group) {
    dispatch(fetchTurbasenUser(email, group));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Turbasen);
