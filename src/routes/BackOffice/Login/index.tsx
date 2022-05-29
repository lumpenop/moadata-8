import Popup from './Popup'
import styles from './login.module.scss'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import cx from 'classnames'
import { authState } from 'store/auth'

const ID = process.env.REACT_APP_ADMIN_ID
const PW = process.env.REACT_APP_ADMIN_PASSWORD

const Login = () => {
  const navigate = useNavigate()
  const [isInvalid, setIsInvalid] = useState(false)
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [, setAuth] = useRecoilState(authState)
  const handleInputId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value)
  }

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value)
  }

  const handleLogin = () => {
    if (ID === idValue && PW === pwValue) {
      setIsInvalid(false)
      setAuth(true)
      navigate('/user')
    } else {
      setIsInvalid(true)
      setAuth(false)
    }
  }

  const renderFloatingMessag = () => {
    if (idValue === '' && idValue === '') return <div className={styles.container} />
    if (ID !== idValue && PW !== pwValue) {
      return <div className={styles.container}>ID 와 PW가 다릅니다.</div>
    }
    if (ID !== idValue && PW === pwValue) {
      return <div className={styles.container}>ID가 다릅니다.</div>
    }
    if (ID === idValue && PW !== pwValue) {
      return <div className={styles.container}>PW가 다릅니다.</div>
    }
    return <div className={styles.container} />
  }
  return (
    <div className={styles.loginWrapper}>
      <h1>백오피스</h1>
      <form>
        <div className={styles.inputWrapper}>
          <input
            type='text'
            name='id'
            placeholder='아이디'
            value={idValue}
            onChange={handleInputId}
            autoComplete='off'
            className={cx(!idValue && styles.focus)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            value={pwValue}
            onChange={handleInputPassword}
            autoComplete='new-password'
            className={cx(!pwValue && styles.focus)}
          />
        </div>
        {isInvalid && renderFloatingMessag()}
        <button type='button' onClick={handleLogin}>
          로그인
        </button>
      </form>
      {isInvalid && <Popup idValue={idValue} pwValue={pwValue} id={ID} pw={PW} />}
    </div>
  )
}

export default Login
