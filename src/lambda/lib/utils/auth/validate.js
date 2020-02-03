const validate = user => {
  console.log('Function `validate` invoked', user);

  console.log(user);
  // could use Mailgun email validation to see if a deliverable address
  // https://documentation.mailgun.com/en/latest/api-email-validation.html#email-validation
  return true;
};

export default validate;
