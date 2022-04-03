import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './components/Form';
import './LoginSignup.scss';

const LoginSignup = ({ handleLoginModal }) => {
  const [menuTab, setMenuTab] = useState('로그인');

  const [signInInput, setSignInInput] = useState({
    email: '',
    password: '',
  });

  const [signUpInput, setSignUpInput] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const goToMain = token => {
    navigate('/');
    if (token) {
      localStorage.setItem('TOKEN', token);
    }
    alert('로그인 되었습니다');
    handleLoginModal();
  };

  const signInCommunication = () => {
    fetch('http://10.58.2.45:8000/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: signInInput.email,
        password: signInInput.password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        result.access_token
          ? goToMain(result.access_token)
          : alert('로그인 실패');
      });
  };

  const signUpCommunication = () => {
    fetch('http://10.58.2.45:8000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        first_name: signUpInput.firstName,
        last_name: signUpInput.lastName,
        email: signUpInput.email,
        password: signUpInput.password,
        phone_number: signUpInput.phoneNumber,
      }),
    })
      .then(response => response.json())
      .then(result => {
        handleSingUpResult(result);
      });
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
      firstName: '',
      lastName: '',
      phoneNumber: '',
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

  const handleSingUpResult = result => {
    if (result.message === 'SUCCESS') {
      alert('회원가입에 성공하였습니다');
      setMenuTab('로그인');
    } else if (result.message === 'ALREADY EXITSTS EMAIL') {
      alert('이미 가입된 회원입니다.');
    }
  };
  return (
    <div className="loginSignup">
      <div className="modalBg" onClick={handleLoginModal} />
      <div className="container">
        <div className="signHeader">
          <h1>{menuTab}</h1>
          <span className="signHeaderLogo">
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
            formType="signIn"
            title="로그인"
            inputData={SIGNIN_DATA}
            signInput={signInInput}
            setSignInInput={setSignInInput}
            handleInput={handleSignInInput}
            signCommunication={signInCommunication}
          />
        ) : (
          <Form
            formType="signUp"
            title="회원가입"
            inputData={SIGNUP_DATA}
            signInput={signUpInput}
            setSignInInput={setSignUpInput}
            handleInput={handleSignUpInput}
            signCommunication={signUpCommunication}
          />
        )}
      </div>
    </div>
  );
};

export default LoginSignup;

const SIGNUP_DATA = [
  {
    type: 'firstName',
    text: '성',
  },
  {
    type: 'lastName',
    text: '이름',
  },
  {
    type: 'phoneNumber',
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
