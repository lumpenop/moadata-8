import Popup from './Popup'
import styles from './login.module.scss'
import { useState, ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const member = {
    id: 'wanted',
    pw: '123456',
  }

  const navigate = useNavigate()
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
      navigate('/user')
    } else {
      setIsInvalid(true)
    }
  }

  useEffect(() => {
    localStorage.setItem('id', member.id)
    localStorage.setItem('pw', member.pw)
  })

  return (
    <div className={styles.loginWrapper}>
      <h1>백오피스</h1>
      <form>
        <div className={styles.inputWrapper}>
          <input type='text' id='id' placeholder='아이디' value={idValue} onChange={handleInputId} autoComplete='off' />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type='password'
            id='password'
            placeholder='비밀번호'
            value={pwValue}
            onChange={handleInputPassword}
            autoComplete='new-password'
          />
        </div>
        {isInvalid && <div>ID 또는 PW가 다릅니다.</div>}
        <button type='button' onClick={handleLogin}>
          로그인
        </button>
      </form>
      {isInvalid && <Popup idValue={idValue} pwValue={pwValue} id={member.id} pw={member.pw} />}
    </div>
  )
}

export default Login
