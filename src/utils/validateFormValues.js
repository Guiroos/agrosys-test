export function validateFormValues(formValues, formType) {
  if (!formValues) {
    return false;
  }

  if (formType === "client") {
    return (
      !formValues.full_name ||
      !formValues.cpf ||
      !formValues.birthdate ||
      !formValues.telephone ||
      !formValues.cellphone
    );
  }

  if (formType === "address") {
    return (
      !formValues.zip_code ||
      !formValues.street ||
      !formValues.neighborhood ||
      !formValues.city ||
      !formValues.state ||
      !formValues.country
    );
  }
}
