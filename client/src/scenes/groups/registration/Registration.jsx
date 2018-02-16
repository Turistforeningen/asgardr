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
  TextArea,
} from 'semantic-ui-react';

import {
  createGroup,
  setField,
  registerGroup,
} from '../../../actions/groups.js';

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
  sendRegistration() {
    const {data} = this.props.group;

    this.props.registerGroup({
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
          <Header size="large">Bli innholdspartner på UT.no</Header>
          <p>
            Er du med i en forening eller organisasjon som merker{' '}
            turstier? Eller jobber du i en kommune med ansvar for{' '}
            å synliggjøre turmulighetene i nærområdene? Driver du{' '}
            ei turisthytte eller et annet overnattingssted - på{' '}
            fjellet i skogen eller ved sjøen - som er åpent og{' '}
            tilgjengelige for alle?
          </p>
          <p>
            Da kan du bli innholdspartner på UT.no og publisere{' '}
            turforslag eller informasjon om hytta.{' '}
            <strong>Det er helt gratis - og lett å komme i gang</strong>:
          </p>
          <p>
            Det er lett å komme i gang. Dere får tilgang til UT.no sine{' '}
            systemer hvor dere kan legge inn og vedlikeholde turforslag og{' '}
            hytter, resten ordner vi:
          </p>

          <List bulleted>
            <List.Item>
              Opprett ei gruppe ved å registrere navn, type og{' '}
              beskrivelse av organisasjonen
            </List.Item>
            <List.Item>
              På de neste stegene kan du legge til mer informasjon{' '}
              (kontaktopplysninger, logo, lenker osv), samt legge{' '}
              til eventuelle andre brukere som skal ha tilgang til{' '}
              gruppa
            </List.Item>
            <List.Item>
              Gruppa må bli godkjent av en administrator før den{' '}
              blir synlig på UT.no, men du kan umiddelbart begynne{' '}
              å legge ut turforslag eller hytter
            </List.Item>
            <List.Item>
              Turene og hyttene blir publisert på UT.no og i UT-appen
            </List.Item>
            <List.Item>
              Turene og hyttene blir publisert med navn og logo på{' '}
              organisasjonen din
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
                  og knytte dette til {group.data.name || 'gruppa'}.
                </p>
                <p>
                  Under{' '}
                  <a href={`https://tur.app.dnt.no/grupper/${group.data.id}`}>
                    mine grupper
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
                      'Kommune',
                      'Fylkeskommune',
                      'Friluftsråd',
                      'Turlag',
                      'Turgruppe',
                      'Idrettslag',
                      'Interesseorganisasjon',
                      'Velforening',
                      'Turistinformasjon',
                      'Destinasjonsselskap',
                      'Bedrift',
                      'Annet',
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
                        onClick={this.sendRegistration}
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
  registerGroup: function dispatchRegisterGroup(group) {
    return dispatch(registerGroup(group));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
