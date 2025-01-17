export const getLoginForm = ({email, password}) => {
  const form = {};
  form['email'] = email;
  form['password'] = password;
  return form;
};

export const getRegisterForm = ({
    email,
    password,
    name
}) => {
    const form = {};
    form['name'] = name;
    form['email'] = email;
    form['password'] = password;
    return form;
  };
  