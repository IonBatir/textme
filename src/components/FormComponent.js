import { Component } from "react";

export default class FormComponent extends Component {
  setFieldValue(field, value) {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...previousState.form,
        [field]: { ...previousState.form[field], value }
      }
    }));
  }

  setFieldError(field, error) {
    this.setState(previousState => ({
      ...previousState,
      form: {
        ...previousState.form,
        [field]: { ...previousState.form[field], error }
      },
      loading: false
    }));
  }
}
