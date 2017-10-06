import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import {fetchInvite} from '../actions/index.js';

class Invite extends Component {
  componentDidMount() {
    this.props.fetchInvite(this.props.code);
  }

  render() {
    const {invite, user, isFetching, code} = this.props;

    if (typeof this.props.code === 'undefined') {
      return <div>Invitasjonskode mangler.</div>;
    } else if (isFetching) {
      return (
        <div>Henter invitasjon...</div>
      );
    } else if (invite.isInvalid) {
      return (
        <div>Invitasjonskoden er ugyldig</div>
      );
    } else if (invite.isFetched) {
      return (
        <div>
          <p>Du er invitert til å bli med i gruppen {invite.data.gruppe.navn}.</p>
          {
            user && user.isAuthenticated ?
              <div>
                <p>
                  Du er logget inn som {user.data.fornavn} {user.data.etternavn} med epost {' '}
                  {user.data.epost}. {' '}
                  <Link to={`/bekreft?kode=${code}`}>Gå videre</Link> for å bli med i gruppen.
                </p>
                <p>
                  Ikke deg? Logg ut, og inn igjen med en annen bruker dersom det ikke er denne
                  brukeren som skal legges til i gruppen.
                </p>
              </div>
            :
              <div>
                For å bli med i gruppen må du logge inn med din DNT-bruker. Hvis du ikke har en
                DNT-bruker kan du opprette en. {' '}
                <a href={`/logg-inn?next=/invitasjon/bekreft?kode=${code}`}>Gå videre</a>
              </div>
          }
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.user.isFetching || state.invite.isFetching,
  code: queryString.parse(ownProps.location.search).kode,
  user: state.user,
  invite: state.invite,
});

const mapDispatchToProps = dispatch => ({
  fetchInvite: function dispacthFetchInvite(code) {
    dispatch(fetchInvite(code));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
