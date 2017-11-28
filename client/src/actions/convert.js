import fetch from 'isomorphic-fetch';
import Raven from 'raven-js';

import turbasen from '../apis/turbasen.js';
import sendgrid from '../apis/sendgrid.js';
import RejectError from '../lib/reject-error.js';

export const USER_CONVERT_REQUEST = 'USER_CONVERT_REQUEST';
export function userConvertRequest() {
  return {
    type: USER_CONVERT_REQUEST,
    isConverted: false,
  };
}

export const USER_CONVERT_RESPONSE = 'USER_CONVERT_RESPONSE';
export function userConvertResponse(user) {
  return {
    type: USER_CONVERT_RESPONSE,
    user: user,
  };
}

export const USER_CONVERT_ERROR = 'USER_CONVERT_ERROR';
export function userConvertError(err) {
  return {
    type: USER_CONVERT_ERROR,
    isConverted: false,
    error: err,
  };
}

export function userConvert(turbasenUser, dntUser) {
  // TODO: Validate turbasenUser and dntUser
  const group = turbasenUser.gruppe;

  let userConverted;

  return (dispatch, getState) => {
    dispatch(userConvertRequest());

    return turbasen
      .get('grupper', group._id)
      .then((json) => {
        const users = json.privat.brukere || [];

        const user = users.find(u => u.epost === turbasenUser.epost);

        if (typeof user === 'undefined') {
          return Promise.reject(new RejectError('Brukeren finnes ikke i gruppa'));
        } else if (user.konvertert === true) {
          return Promise.reject(new RejectError('Brukeren er allerede konvertert'));
        } else if (users.find(u => `${u.id}` === `sherpa3:${dntUser.sherpa_id}`)) {
          return Promise.reject(new RejectError('Brukeren har allerede tilgang til denne gruppa'));
        }

        userConverted = {
          ...user,
          konvertert: true,
        };

        json.privat.brukere = [
          ...users.map((u) => {
            if (u.epost === turbasenUser.epost) {
              return userConverted;
            }

            return u;
          }),
          {
            id: `sherpa3:${dntUser.sherpa_id}`,
            navn: `${dntUser.fornavn} ${dntUser.etternavn}`,
            epost: dntUser.epost,
          },
        ];

        return turbasen.save('grupper', group._id, json);
      })
      .then((json) => {
        dispatch(userConvertResponse(userConverted));
      })
      .catch((err) => {
        if (err instanceof RejectError) {
          dispatch(userConvertError(err));
        } else {
          Raven.captureException(err);
        }
      })
      .then(() => {
        const email = {
          to: dntUser.epost,
          subject: `Velkommen til gruppa ${group.navn} på UT.no`,
          html: `<h2>Hei ${dntUser.fornavn} ${dntUser.etternavn},</h2>
            <p>Velkommen som medlem i gruppa ${group.navn}!</p>
            <p>Du har nå tilgang til redigering av gruppas innhold på UT.no med din DNT-bruker.</p>
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
