const groupValidator = (data) => {
  const errors = {};
  const warnings = {};

  Object.keys(data).forEach((field) => {
    switch (field) {
      case 'name':
        if (!data.name) {
          errors.name = 'Navn er påkrevd';
        }
        break;

      case 'description':
        if (!data.description) {
          errors.description = 'Beskrivelse av gruppa er påkrevd';
        }
        break;

      default:
        break;
    }
  });

  return {errors, warnings};
};

export default groupValidator;
