import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Redirect, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Conversion from './scenes/conversion/Conversion.jsx';
import Portal from './scenes/portal/Portal.jsx';
import Groups from './scenes/groups/Groups.jsx';
import Invite from './scenes/invite/Invite.jsx';

import Header from './components/Header.jsx';

require('./styles/app.scss');

const PrivateRoute = ({component: PrivateComponent, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated ?
      <PrivateComponent {...props}/>
      :
      <Redirect to={{pathname: '/', state: {from: props.location}}}/>
    )}
  />
);

class App extends Component {
  render() {
    const {session} = this.props;

    return (
      <Switch basename="/">
        {
          session.isFetching ?
          null
          :
          <div>
            <Header
              isAuthenticated={session.isAuthenticated}
              user={session.data.user}
            />
            <Container>
              <Route exact path="/" component={Portal} />
              <Route path="/bruker/konverter" component={Conversion} />
              <PrivateRoute
                path="/grupper"
                isAuthenticated={session.isAuthenticated}
                component={Groups}
              />
              <Route path="/invitasjon" component={Invite} />
            </Container>
          </div>
          }
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
