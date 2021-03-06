import Raven from 'raven-js';

import turbasen from '../apis/turbasen.js';
import sendgrid from '../apis/sendgrid.js';
import RejectError from '../lib/reject-error.js';

export const INVITE_FETCH_REQUEST = 'INVITE_FETCH_REQUEST';
export function inviteFetchRequest(code) {
  return {
    type: INVITE_FETCH_REQUEST,
    code: code,
  };
}

export const INVITE_FETCH_RESPONSE = 'INVITE_FETCH_RESPONSE';
export function inviteFetchResponse(data) {
  return {
    type: INVITE_FETCH_RESPONSE,
    data: data,
  };
}

export const INVITE_FETCH_ERROR = 'INVITE_FETCH_ERROR';
export function inviteFetchError(error) {
  return {
    type: INVITE_FETCH_ERROR,
    error: error,
  };
}

export function fetchInvite(code) {
  return (dispatch, getState) => {
    if (typeof code === 'undefined' || code.length === 0) {
      return dispatch(inviteFetchError(new RejectError('Kode mangler.')));
    }

    dispatch(inviteFetchRequest(code));

    return turbasen
      .find('grupper', {'privat.invitasjoner.kode': code, fields: 'privat'})
      .then((json) => {
        if (json.documents.length === 0) {
          return Promise.reject(new RejectError(
            `Fant ingen invitasjon med denne koden. Kontroller at du har
            fulgt lenken du har fått på epost.`
          ));
        } else if (json.documents.length > 1) {
          return Promise.reject(new RejectError(
            'Fant flere invitasjoner med oppgitt kode. Ta kontakt for å finne rett invitasjon.'
          ));
        }

        // Find invite
        const group = json.documents[0];
        const invite = json.documents[0].privat.invitasjoner.find((i) => i.kode === code);

        // Invite is found, unique – receive it
        return dispatch(inviteFetchResponse({...invite, gruppe: group}));
      })
      .catch((err) => {
        if (err instanceof RejectError) {
          dispatch(inviteFetchError(err));
        } else {
          console.error(err); // eslint-disable-line no-console

          Raven.captureException(err);
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
        const invites = json.privat.invitasjoner || [];
        const users = json.privat.brukere || [];

        const invite = invites.find((invitasjon) => invitasjon.kode === code);

        if (typeof invite === 'undefined') {
          return Promise.reject(new RejectError('Koden er ikke gyldig for denne gruppen'));
        } else if (invite.brukt === true) {
          return Promise.reject(new RejectError('Koden har allerede blitt brukt'));
        } else if (users.find((u) => `${u.id}` === `sherpa3:${user.sherpa_id}`)) {
          return Promise.reject(new RejectError('Du har allerede tilgang til denne gruppa'));
        }

        json.privat.invitasjoner = invites.map((invitasjon) => {
          if (invitasjon.kode === code) {
            return {
              ...invite,
              brukt: true,
              brukt_av: {
                id: user.id,
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
            id: user.id,
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
        if (err instanceof RejectError) {
          dispatch(inviteAcceptError(err));
        } else {
          Raven.captureException(err);
        }
      })
      .then(() => {
        const email = {
          to: user.epost,
          subject: `Velkommen til gruppa ${group.navn} på UT.no`,
          html: `<h2>Hei ${user.fornavn} ${user.etternavn},</h2>
            <p>Velkommen som medlem i gruppa ${group.navn}!</p>
            <p>Du har nå tilgang til redigering av gruppas innhold på UT.no.</p>
            <p><a href="https://admin.nasjonalturbase.no">Klikk her for å komme i gang</a>!</p>
            <p>
              Vennlig hilsen<br>
              <a href="https://www.ut.no">UT.no</a> /
              <a href="https://www.dnt.no">Den Norske Turistforening</a>
            </p>
          `,
        };

        return sendgrid.send(email);
      })
      .catch((err) => {
        Raven.captureException(err);
      });
  };
}
