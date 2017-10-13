import fetch from 'isomorphic-fetch';

import turbasen from '../../../apis/turbasen.js';

export const SET_MESSAGE = 'SET_MESSAGE';
export function setMessage() {
  return {
    type: SET_MESSAGE,
  };
}

export const REQUEST_INVITE = 'REQUEST_INVITE';
export function requestInvite(code) {
  return {
    type: REQUEST_INVITE,
    code: code,
  };
}

export const RECEIVE_INVITE = 'RECEIVE_INVITE';
export function receiveInvite(data) {
  return {
    type: RECEIVE_INVITE,
    data: data,
  };
}

export function fetchInvite(code) {
  return (dispatch, getState) => {
    dispatch(requestInvite(code));

    return turbasen
      .find('grupper', {'privat.invitasjoner.kode': code, fields: 'privat'})
      .then((json) => {
        if (json.documents.length === 0) {
          // TODO: Handle this
        } else if (json.documents.length > 1) {
          // TODO: Handle this
        } else {
          const group = json.documents[0];
          const data = json.documents[0].privat.invitasjoner.find(i => i.kode === code);

          dispatch(receiveInvite({...data, gruppe: group}));
        }
      });
  };
}

export const INVITE_ACCEPT_REQUEST = 'INVITE_ACCEPT_REQUEST';
export function inviteAcceptRequest() {
  return {
    type: INVITE_ACCEPT_REQUEST,
    isAccepted: false,
  };
}

export const INVITE_ACCEPT_RESPONSE = 'INVITE_ACCEPT_RESPONSE';
export function inviteAcceptResponse() {
  return {
    type: INVITE_ACCEPT_RESPONSE,
    isAccepted: true,
  };
}

export const INVITE_ACCEPT_ERROR = 'INVITE_ACCEPT_ERROR';
export function inviteAcceptError(err) {
  return {
    type: INVITE_ACCEPT_ERROR,
    isAccepted: false,
    error: err,
  };
}

export function acceptInvite(code, group, user) {
  return (dispatch, getState) => {
    dispatch(inviteAcceptRequest());

    return turbasen
      .get('grupper', group._id)
      .then((json) => {
        const invites = json.privat.invitasjoner;
        const users = json.privat.brukere;

        const invite = invites.find(invitasjon => invitasjon.kode === code);

        if (typeof invite === 'undefined') {
          return Promise.reject(new Error('Koden er ikke gyldig for denne gruppen'));
        } else if (invite.brukt === true) {
          return Promise.reject(new Error('Koden har allerede blitt brukt'));
        } else if (users.find(u => u.id === user.sherpa_id)) {
          return Promise.reject(new Error('Brukeren har allerede tilgang til denne gruppen'));
        }

        json.privat.invitasjoner = invites.map((invitasjon) => {
          if (invitasjon.kode === code) {
            return {
              ...invite,
              brukt: true,
              brukt_av: {
                id: user.sherpa_id,
                navn: `${user.fornavn} ${user.etternavn}`,
                epost: user.epost,
              },
            };
          }

          return invitasjon;
        });

        json.privat.brukere = [
          ...users,
          {
            id: user.sherpa_id,
            navn: `${user.fornavn} ${user.etternavn}`,
            epost: user.epost,
          },
        ];

        return turbasen.save('grupper', group._id, json);
      })
      .then((json) => {
        dispatch(inviteAcceptResponse(json));
      })
      .catch((err) => {
        dispatch(inviteAcceptError(err));
      });
  };
}

export const REQUEST_USER = 'REQUEST_USER';
export function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

export const RECEIVE_USER = 'RECEIVE_USER';
export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user,
    isAuthenticated: typeof user === 'object',
  };
}


export function fetchUser() {
  return (dispatch, getState) => {
    let statusCode;

    dispatch(requestUser());

    const options = {
      credentials: 'same-origin',
      headers: {Accept: 'application/json'},
    };

    return fetch('/profil', options)
      .then((response) => {
        statusCode = response.status;

        return response.json();
      })
      .then((json) => {
        if (statusCode !== 200) {
          dispatch(receiveUser());
        } else {
          dispatch(receiveUser(json));
        }
        return json;
      })
      .catch((err) => { throw new Error(err); });
  };
}

