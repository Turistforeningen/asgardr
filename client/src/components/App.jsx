import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

require('../styles/app.scss');

class App extends Component {
  render() {
    return (
      <Switch basename="/">
        <div>
          <header>
            <div className="container">
              <a href="https://www.dnt.no">
                Den Norske Turistforening
              </a>
            </div>
          </header>
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
