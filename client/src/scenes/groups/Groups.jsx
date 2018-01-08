import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {Button, Dimmer, Divider, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import Registration from './registration/Registration.jsx';

class Groups extends Component {
  componentDidMount() {
  }

  render() {
      return (
        <Switch basename="/grupper">
          <div>
            <Route exact path="/registrering" render={(props) => (
              <Registration />
            )} />
          </div>
        </Switch>
      );
  }
}

const mapStateToProps = (state, ownProps) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  sendGroupRegistration: function dispatchSendGroupRegistration() {
    console.log('send g r');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
