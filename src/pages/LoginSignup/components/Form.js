import React from 'react';
import FormLayout from './FormLayout';
import Input from './Input';
import Button from './Button';
import './Form.scss';

const Form = ({
  isLogin,
  title,
  inputData,
  handleInput,
  signInput,
  signCommunication,
}) => {
  return (
    <FormLayout>
      <div className="form">
        {isLogin
          ? inputData.map((input, idx) => (
              <Input
                isLogin={isLogin}
                key={idx}
                type={input.type}
                text={input.text}
                value={signInput[input.type]}
                signInput={signInput}
                handleInput={handleInput}
              />
            ))
          : inputData.map((input, idx) => (
              <Input
                isLogin={isLogin}
                key={idx}
                type={input.type}
                text={input.text}
                value={signInput[input.type]}
                signInput={signInput}
                handleInput={handleInput}
                isValid={signUpValidator[input.type](signInput[input.type])}
              />
            ))}
        <Button
          title={title}
          signCommunication={signCommunication}
          signInput={signInput}
        />
      </div>
    </FormLayout>
  );
};

export default Form;

const signUpValidator = {
  firstName: value => value.length >= 1,
  lastName: value => value.length >= 1,
  phoneNumber: value =>
    value.length === 11 && parseInt(value) && value.includes('010'),
  email: value => value.includes('@' && '.com'),
  password: value =>
    value.includes('!' || '@' || '#' || '$' || '%' || '&' || '?') &&
    value.length >= 8,
};
