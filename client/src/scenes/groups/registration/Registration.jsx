import React, {Component} from 'react';
import {autobind} from 'core-decorators';
import {connect} from 'react-redux';

import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
  List,
  Message,
  Segment,
  TextArea
} from 'semantic-ui-react';

import {createGroup, setField, saveGroup} from '../../../actions/groups.js';

class Registration extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const {user} = this.props.session.data;

    this.props.createGroup({
      id: user.id,
      name: `${user.fornavn} ${user.etternavn}`,
      email: user.epost,
    });

    this.setState({
      contactName: `${user.fornavn} ${user.etternavn}`,
      contactEmail: user.epost,
    });
  }

  @autobind
  handleTypeChange(e, data) {
    const type = data.value;

    this.setState({type: type});
    this.props.setField('type', type);
  }

  @autobind
  handleFieldChange(e) {
    const field = e.target.name;
    const {value} = e.target;

    this.setState({[field]: value});
  }

  @autobind
  handleFieldBlur(e) {
    const field = e.target.name;
    const {value} = e.target;

    this.props.setField(field, value);
  }

  @autobind
  saveGroup() {
    const {data} = this.props.group;

    this.props.saveGroup({
      navn: data.name,
      beskrivelse: data.description,
      privat: {
        brukere: data.users.map((user) => ({
          id: user.id,
          navn: user.name,
          epost: user.email,
        })),
        opprettet_av: data.users[0],
      },
      tags: [data.type],
      status: data.status,
      lisens: data.license,
    });
  }

  render() {
    if (!this.props.group) {
      return null;
    }

    const {group} = this.props;

    return (
      <Grid columns={2} relaxed>
        <Grid.Column>
          <Header size="large">Bli innholdspartner</Header>
          <p>
            Er du med i en forening eller organisasjon som tilrettelegger{' '}
            for friluftsliv? Nå kan dere bli innholdspartnere på UT.no.

          </p>
          <p>
            Har dere merket turstier eller kanskje dere kjenner spesielt {' '}
            godt til turtilbudet i nærområdet deres?
          </p>
          <p>Det er lett å komme i gang. Dere får tilgang til UT.no sine{' '}
            systemer hvor dere kan legge inn og vedlikeholde turforslag og{' '}
            hytter, resten ordner vi:
          </p>

          <List bulleted>
            <List.Item>
              Turene deres publiseres på UT.no og i UTappen umiddelbart
            </List.Item>
            <List.Item>
              Turene blir søkbare og lett å finne på UT.no og Google
            </List.Item>
            <List.Item>
              Turene blir publisert med navn og logo på foreningen din
            </List.Item>
            <List.Item>
              Turene blir inntegnet på oppdaterte kart fra Statens kartverk
            </List.Item>
            <List.Item>
                Det koster ingenting å bli innholdspartner på UT.no.
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column>
          <Segment padded textAlign="left" stacked>
            {
              this.props.group.isSaved
              ?
              <Message>
                <h3>
                  Takk for din registrering!
                </h3>
                <p>
                  Du kan nå opprette turforslag eller annet innhold,{' '}
                 og knytte dette til gruppa.
                </p>
                <p>
                  Under{' '}
                  <a href={`https://tur.app.dnt.no/grupper/${group.data.id}`}>
                    redigering av gruppa
                  </a>{' '}
                  kan du invitere flere brukere, og legge inn info som{' '}
                  blir synlig på UT.no.
                </p>
              </Message>
              :
              <Form size="large">
                <Form.Field
                  required
                  error={!!((group.touched.name || group.isValidated) && group.errors.name)}
                >
                  <label>Navn på organisasjonen</label>
                  <Form.Input
                    type="text"
                    value={this.state.name || ''}
                    name="name"
                    onChange={this.handleFieldChange}
                    onBlur={this.handleFieldBlur}
                  />
                  {
                    (group.touched.name || group.isValidated) && group.errors.name &&
                    <Label basic color="red" pointing="above">
                      {this.props.group.errors.name}
                    </Label>
                  }
                </Form.Field>

                <Form.Field required>
                  <label>Type organisasjon</label>
                  <Dropdown
                    placeholder="Velg type organisasjon"
                    fluid
                    selection
                    options={[
                      'Turlag',
                      'Idrettslag',
                      'Friluftsråd',
                      'Reiselivsselskap',
                      'Kommune',
                      'Fylkeskommune',
                    ].map((item) => ({text: item, value: item}))}
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                  />
                  {
                    (group.touched.type || group.isValidated) &&
                    group.errors.type &&
                    <Label basic color="red" pointing="above">
                      {group.errors.type}
                    </Label>
                  }
                </Form.Field>

                <Form.Field required>
                  <label>Beskrivelse</label>
                  <TextArea
                    type="text"
                    name="description"
                    value={this.state.description || ''}
                    onChange={this.handleFieldChange}
                    onBlur={this.handleFieldBlur}
                  />
                  {
                    (group.touched.description || group.isValidated) &&
                    group.errors.description &&
                    <Label basic color="red" pointing="above">
                      {group.errors.description}
                    </Label>
                  }
                </Form.Field>
                {
                  !!Object.keys(group.errors).length &&
                  group.isValidated &&
                  <Message>
                    Før skjemaet kan sendes inn, må du rette opp i feltene som er markert
                    med feil.
                  </Message>
                }
                {
                  (() => {
                    if (this.props.group.isSaving) {
                      return (
                        <Button fluid type="button" color="blue" size="large" disabled>
                          Sender registrering ...
                        </Button>
                      );
                    }

                    return (
                      <Button
                        fluid
                        type="button"
                        color="blue"
                        size="large"
                        onClick={this.saveGroup}
                      >
                        Registrer gruppe
                      </Button>
                    );
                  })()
                }
              </Form>

            }
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  group: state.groups,
});

const mapDispatchToProps = (dispatch) => ({
  createGroup: function dispatchCreateGroup(user) {
    dispatch(createGroup(user));
  },
  setField: function dispatchSetField(key, value) {
    dispatch(setField(key, value));
  },
  saveGroup: function dispatchSaveGroup(group) {
    return dispatch(saveGroup(null, group));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
