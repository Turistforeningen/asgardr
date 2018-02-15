import turbasen from '../apis/turbasen.js';
import sendgrid from '../apis/sendgrid.js';

import groupValidator from '../validators/group.js';
import RejectError from '../lib/reject-error.js';

export const CREATE_GROUP = 'CREATE_GROUP';
export function createGroup(user) {
  return {
    type: CREATE_GROUP,
    data: {
      status: 'Kladd',
      license: 'CC BY-NC 4.0',
      contactName: user.name,
      contactEmail: user.email,
      users: [user],
    },
  };
}

export const SET_FIELD = 'SET_FIELD';
export function setField(key, value) {
  return {
    type: SET_FIELD,
    key: key,
    value: value,
  };
}

export const SET_VALIDATION = 'SET_VALIDATION';
export function setValidation(errors, warnings) {
  return {
    type: SET_VALIDATION,
    errors: errors,
    warnings: warnings,
  };
}

export function validateGroup(group) {
  return (dispatch, getState) => {
    const state = getState();
    const {data} = state.groups;
    const {errors, warnings} = groupValidator(data);

    dispatch(setValidation(errors, warnings));

    return new Promise((resolve, reject) => {
      if (Object.keys(errors).length > 0) {
        reject(new RejectError('Form contains validation errors'));
      } else {
        resolve(group);
      }
    });
  };
}

export const SAVE_GROUP_REQUEST = 'SAVE_GROUP_REQUEST';
export function saveGroupRequest() {
  return {
    type: SAVE_GROUP_REQUEST,
  };
}

export const SAVE_GROUP_SUCCESS = 'SAVE_GROUP_SUCCESS';
export function saveGroupSuccess(result) {
  return {
    type: SAVE_GROUP_SUCCESS,
    document: result.document,
  };
}

export const SAVE_GROUP_ERROR = 'SAVE_GROUP_ERROR';
export function saveGroupError(err) {
  return {
    type: SAVE_GROUP_ERROR,
    error: err,
  };
}

export function saveGroup(id, group) {
  return (dispatch, getState) => (
    dispatch(validateGroup())
      .then(() => {
        dispatch(saveGroupRequest());

        return turbasen
          .save('grupper', id, group)
          .then((result) => {
            dispatch(saveGroupSuccess({document: result.document}));

            return result;
          })
          .catch((err) => {
            console.error(err); // eslint-disable-line

            throw err;
          });
      })
      .catch((err) => {
        saveGroupError(err);
        console.warn('Could not save group, due to validation errors'); // eslint-disable-line

        throw err;
      })
  );
}

export function registerGroup(group) {
  return (dispatch, getState) => (
    dispatch(saveGroup(undefined, group))
      .then((result) => {
        console.log('tries to send');
        const user = group.privat.brukere[0];
        const email = {
          // to: user.epost,
          // cc: 'post@ut.no',
          subject: `${group.navn} er nå registrert på UT.no`,
          html: `<h2>Hei ${user.navn},</h2>
            <p>
              Du kan nå opprette turforslag eller annet innhold,
              og knytte dette til {group.data.name || 'gruppa'}.
            </p>
            <p>
              Under
              <a href="https://tur.app.dnt.no/grupper/${result.document._id}">
                redigering av gruppa
              </a>
              kan du invitere flere brukere, og legge inn info som
              blir synlig på UT.no.
            </p>
            <p>
              Du har nå tilgang til redigering av gruppas innhold på UT.no.
            </p>
            <p>
              <a href="https://admin.nasjonalturbase.no">Klikk her for å komme i gang</a>!
            </p>
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
        console.warn('Errors occured when registering group, already handled'); // eslint-disable-line
      })
  );
}
