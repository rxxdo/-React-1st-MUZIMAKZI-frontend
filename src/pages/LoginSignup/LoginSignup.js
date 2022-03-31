import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import './LoginSignup.scss';

const LoginSignup = () => {
  const [isActice, setIsActice] = useState(false);
  const [menuTab, setMenuTab] = useState('로그인');

  const [signInInput, setSignInInput] = useState({
    email: '',
    password: '',
  });

  const [signUpInput, setSignUpInput] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const goToMain = token => {
    navigate('/');
    console.log(token);
  };

  const checkSignInInput = () => {
    const check =
      signInInput.email.indexOf('@') === -1 || signInInput.password.length < 5;
    setIsActice(!check);
  };
  const checkSignUpInput = () => {
    const check =
      signUpInput.email.indexOf('@') === -1 || signUpInput.password.length < 5;
    setIsActice(!check);
  };

  const signInCommunication = () => {
    fetch('http://10.58.7.81:8000/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: signInInput.email,
        password: signInInput.password,
      }),
    })
      .then(response => response.json())
      .then(result =>
        result.token ? goToMain(result.token) : alert(result.message)
      );
    console.log('로그인 통신');
  };

  const signUpCommunication = () => {
    fetch('http://10.58.7.81:8000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: signInInput.name,
        email: signInInput.email,
        password: signInInput.password,
        phone: signInInput.phone,
      }),
    })
      .then(response => response.json())
      .then(result => alert(result.message));
    console.log('회원가입 통신');
  };

  const handleSignInInput = e => {
    const { name, value } = e.target;
    setSignInInput({ ...signInInput, [name]: value });
  };

  const handleSignUpInput = e => {
    const { name, value } = e.target;
    setSignUpInput({ ...signUpInput, [name]: value });
  };

  const handleLoginTabButton = () => {
    setMenuTab('로그인');
    setSignUpInput({
      name: '',
      phone: '',
      email: '',
      password: '',
    });
  };

  const handleSingupTabButton = () => {
    setMenuTab('회원가입');
    setSignInInput({
      email: '',
      password: '',
    });
  };

  return (
    <div className="LoginSignup">
      <div className="SignHeader">
        <h1>{menuTab}</h1>
        <span className="SignHeaderLogo">
          <span>MUZI</span>
          <img src="images/loginsignup/無知莫知.png" alt="무지막지로고" />
        </span>
      </div>
      <ul className={menuTab === '로그인' ? 'loginTap' : 'signupTap'}>
        <li>
          <button className="login" onClick={handleLoginTabButton}>
            로그인
          </button>
        </li>
        <li>
          <button className="signin" onClick={handleSingupTabButton}>
            회원가입
          </button>
        </li>
      </ul>
      {menuTab === '로그인' ? (
        <Form
          type="signIn"
          title="로그인"
          inputData={SIGNIN_DATA}
          signInput={signInInput}
          setSignInInput={setSignInInput}
          handleInput={handleSignInInput}
          signCommunication={signInCommunication}
        />
      ) : (
        <Form
          type="signUp"
          title="회원가입"
          inputData={SIGNUP_DATA}
          signInput={signUpInput}
          setSignInInput={setSignUpInput}
          handleInput={handleSignUpInput}
          signCommunication={signUpCommunication}
        />
      )}
    </div>
  );
};

const SIGNUP_DATA = [
  {
    type: 'name',
    text: '이름',
  },
  {
    type: 'phone',
    text: '전화번호',
  },
  {
    type: 'email',
    text: '이메일',
  },
  {
    type: 'password',
    text: '비밀번호',
  },
];

const SIGNIN_DATA = [
  {
    type: 'email',
    text: '이메일',
  },
  {
    type: 'password',
    text: '비밀번호',
  },
];

export default LoginSignup;
