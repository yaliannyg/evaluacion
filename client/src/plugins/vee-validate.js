import { localize, extend } from "vee-validate";
import {} from "vee-validate";

import { required, min } from "vee-validate/dist/rules";

extend("required", required);

extend("min", min);
extend("SSN", {
  validate: (value) => {
    const pattern = /^\d{3}-\d{2}-\d{4}$/;
    return pattern.test(value);
  },
});

localize({
  en: {
    messages: {
      required: (field) => `${field} is required`,
      min: (field, { length }) =>
        `${field} must have no less than ${length} characters`,
      SSN: (field) => `${field} format is incorrect. Format: ###-##-####`,
    },
  },
});
