import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Conversion from './scenes/conversion/Conversion.jsx';
import Portal from './scenes/portal/Portal.jsx';
import Invite from './scenes/invite/Invite.jsx';

import Header from './components/Header.jsx';

require('./styles/app.scss');

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
