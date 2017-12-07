import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Convert from './scenes/users/Convert.jsx';
import Turbasen from './scenes/users/Turbasen.jsx';

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
            <Header isAuthenticated={session.isAuthenticated} user={session.data.user} />
              <Container>
                <Route exact path="/bruker/turbasen" component={Turbasen} />
                <Route exact path="/bruker/konverter" component={Convert} />
              </Container>
          </div>
        }
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
