const groupValidator = (data) => {
  const errors = {};
  const warnings = {};

  function validate(field, value) {
    switch (field) {
      case 'name':
        if (!data.name) {
          return 'Navn er påkrevd';
        }

        break;

      case 'type':
        if (!data.type) {
          return 'Du må velge en type organisasjon';
        }

        break;

      case 'description':
        if (!value) {
          return 'Beskrivelse av gruppa er påkrevd';
        }

        break;

      default:
        break;
    }

    return false;
  }

  const name = validate('name', data.name);

  if (name) {
    errors.name = name;
  }

  const type = validate('type', data.type);

  if (type) {
    errors.type = type;
  }

  const description = validate('description', data.description);

  if (description) {
    errors.description = description;
  }

  return {errors, warnings};
};

export default groupValidator;
