import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Grid, Icon, Form, Message, Segment} from 'semantic-ui-react';

import {} from '../actions/index.js';
import LoginTurbasen from '../../../components/users/LoginTurbasen.jsx';

class Portal extends Component {
  render() {
    const {user} = this.props;
    const qs = queryString.parse(this.props.location.search);

    return (
      <div>
        {
          (() => {
            if (user.isFetching === true) {
              return (
                <Segment basic loading style={{minHeight: '100vh'}}></Segment>
              );
            } else if (user.isAuthenticated === true) {
              return (
                <Segment>
                  <Grid columns={2} relaxed>
                    <Grid.Column>
                        <Segment basic textAlign="center">
                          <a href="https://tur.app.dnt.no/logout?next=/login/dnt/connect">
                            <Icon name="map signs" size="huge" />
                            <br /><br />
                            <Button color="blue" content="Turforslag" icon='right arrow' labelPosition='right' />
                          </a>
                      </Segment>
                    </Grid.Column>
                    {(user.data.is_admin || user.data.is_external) &&
                      <Grid.Column>
                        <Segment basic textAlign="center">
                            <a href="https://hytte.app.dnt.no/auth/logout?next=/auth/login/dnt">
                              <Icon name="bed" size="huge" color="brown" />
                              <br /><br />
                              <Button color="brown" content="Hytter" icon='right arrow' labelPosition='right' />
                            </a>
                        </Segment>
                      </Grid.Column>
                    }
                  </Grid>
                </Segment>
              );
            }

            if (qs && qs.error && qs.error === 'TBAUTH-401') {
              return (
                <LoginTurbasen error={qs.error}/>
              );
            }

            return (
              <Segment basic textAlign="center">
                <p style={{fontSize: '1.4em'}}>
                  Dette er innlogging for DNT-foreninger, andre{' '}
                  innholdspartnere og privatpersoner som skal publisere{' '}
                  innhold på UT.no.
                </p>
                <p style={{fontSize: '1.4em'}}>
                  Hvis du ikke har en DNT-bruker kan du{' '}
                  <a href="https://www.dnt.no/minside/logg-inn/?next=/minside/#registrering">registrere deg</a>.
                </p>
                {
                  qs && qs.error && qs.error === 'auth' &&
                  <Message error>
                    Det skjedde en feil ved innlogging. Prøv igjen, og {' '}
                    ta kontakt dersom feilen vedvarer.
                  </Message>
                }
                <Button
                  as="a"
                  href="/logg-inn/dnt"
                  icon="user"
                  labelPosition="left"
                  content="Logg inn"
                  color="grey"
                  size="huge"
                />
                <LoginTurbasen />
              </Segment>
            );
          })()
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Portal);
