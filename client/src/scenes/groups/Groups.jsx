import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import Registration from './registration/Registration.jsx';

class Groups extends Component {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
