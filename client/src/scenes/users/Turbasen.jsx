import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import {Button, Grid, Header, Message, Segment} from 'semantic-ui-react';

class Turbasen extends Component {
  render() {
    const {session, isFetching} = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          {
            session && session.data && session.data.turbasen ? // eslint-disable-line no-nested-ternary
              <Segment padded stacked>
                <h2>Hei, {session.data.turbasen.navn}</h2>
                <p>
                  Vi har gått over fra innlogging med eget brukernavn og passord for {' '}
                  innholdspartnere, til DNT-bruker.
                </p>
                <p>
                  For å fortsette må du derfor logge inn med DNT-bruker. Hvis du ikke har{' '}
                  det, kan du enkelt opprette en.
                </p>
                <Button
                  as="a"
                  size="big"
                  color="blue"
                  fluid
                  href={`/logg-inn/dnt?next=/bruker/konverter`}
                >
                  Gå videre
                </Button>
              </Segment>
                :
              <Segment basic>
                test
              </Segment>
            }
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.user.isFetching,
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Turbasen);
