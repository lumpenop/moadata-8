import Popup from './Popup'
import styles from './login.module.scss'
import React, { useState, ChangeEvent } from 'react'

const member = {
  id: 'wanted',
  pw: '123456',
}

const Login = () => {
  const [isInvalid, setIsInvalid] = useState(false)
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')

  const handleInputId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value)
  }
  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value)
  }

  const handleLogin = () => {
    const ID = localStorage.getItem('id')
    const PW = localStorage.getItem('pw')
    if (ID === idValue && PW === pwValue) {
      setIsInvalid(false)
    } else {
      setIsInvalid(true)
    }
  }
  return (
    <div className={styles.loginWrapper}>
      <h1>백오피스</h1>
      <form>
        <div className={styles.inputWrapper}>
          <input type='text' id='id' placeholder='아이디' onChange={handleInputId} />
        </div>
        <div className={styles.inputWrapper}>
          <input type='password' id='password' placeholder='비밀번호' onChange={handleInputPassword} />
        </div>
        {isInvalid && <span>아이디 비번 달라요</span>}
        <button type='button' onClick={handleLogin}>
          로그인
        </button>
      </form>
      {isInvalid && <Popup id={member.id} pw={member.pw} />}
    </div>
  )
}

export default Login
