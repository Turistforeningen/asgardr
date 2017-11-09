import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Portal from './scenes/Portal.jsx';

import Header from './components/Header.jsx';

require('./styles/app.scss');

class App extends Component {
  render() {
    const {user} = this.props;

    return (
      <Switch basename="/">
        <div>
          <Header user={user} />
            <Container>
              <Route exact path="/" component={Portal} />
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
