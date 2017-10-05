import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import Invite from './scenes/Invite.jsx';
import Confirm from './scenes/Confirm.jsx';

require('./styles/app.scss');

class App extends Component {
  render() {
    const {user} = this.props;

    return (
      <Switch basename="/invitasjon">
        <div>
          <header>
            <div className="container">
              <a href="https://www.dnt.no">
                Den Norske Turistforening
              </a>
              {
                user && user.isAuthenticated ?
                  <span>
                    Logget inn som {user.data.fornavn} {user.data.etternavn}
                    <a href="/logg-ut" className="ui right labeled icon blue button">
                      <i className="right arrow icon"></i> Logg ut
                    </a>
                  </span>
                :
                  <a href="/logg-inn" className="ui right labeled icon blue button">
                    <i className="right arrow icon"></i> Logg inn
                  </a>
              }
            </div>
          </header>
          <Route exact path="/" component={Invite} />
          <Route exact path="/bekreft" component={Confirm} />
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
