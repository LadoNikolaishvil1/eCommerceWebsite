import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[+]?[(]?[0-9]{3,4}[)]?[-\\s.]?[0-9]{3,5}[-\\s.]?[0-9]{3,6}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  zip: yup
    .string()
    .matches(/^[0-9]{4,10}$/, "ZIP Code must be 4–10 digits")
    .required("ZIP Code is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  paymentMethod: yup
    .string()
    .oneOf(["e-Money", "Cash on Delivery"], "Select a valid payment method")
    .required("Payment method is required"),
  eMoneyNumber: yup.string().when("paymentMethod", {
    is: "e-Money",
    then: (schema) =>
      schema
        .matches(/^[0-9]{9}$/, "e-Money Number must be 9 digits")
        .required("e-Money Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  eMoneyPin: yup.string().when("paymentMethod", {
    is: "e-Money",
    then: (schema) =>
      schema
        .matches(/^[0-9]{4}$/, "PIN must be 4 digits")
        .required("e-Money PIN is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
