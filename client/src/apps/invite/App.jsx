import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Invite from './scenes/Invite.jsx';
import Confirm from './scenes/Confirm.jsx';

import Header from '../../components/Header.jsx';

require('../../styles/app.scss');

class App extends Component {
  render() {
    const {user} = this.props;

    return (
      <Switch basename="/invitasjon">
        <div>
          <Header user={user} />
            <Container>
              <Route exact path="/" component={Invite} />
              <Route exact path="/bekreft" component={Confirm} />
            </Container>
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
