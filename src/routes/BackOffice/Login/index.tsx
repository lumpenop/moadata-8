import Popup from './Popup'
import styles from './login.module.scss'
import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import cx from 'classnames'
import { authState } from 'store/auth'
import { LoginLockIcon, LoginMailIcon, MoadataLogo } from 'assets'

const ID = process.env.REACT_APP_ADMIN_ID
const PW = process.env.REACT_APP_ADMIN_PASSWORD

const Login = () => {
  const navigate = useNavigate()
  const [isInvalid, setIsInvalid] = useState(false)
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [show, setShow] = useState(false)
  const [, setAuth] = useRecoilState(authState)
  const [popUpMessage, setPopUpMessage] = useState('')
  const handleInputId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value)
  }

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (ID === idValue && PW !== pwValue) {
      return setPopUpMessage('비밀번호가 다릅니다.')
    }
    if (ID !== idValue && pwValue) {
      return setPopUpMessage('존재하지 않는 ID입니다.')
    }
    if (ID === idValue && PW === pwValue) {
      return setPopUpMessage('Success!')
    }
    return setPopUpMessage('')
  }, [idValue, pwValue])

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

  const handleShowPassword = () => {
    setShow(!show)
  }

  const renderFloatingMessag = () => {
    if (idValue === '' || idValue === '') return <div className={styles.container} />
    if (ID === idValue && PW !== pwValue) {
      return <div className={styles.container}>{popUpMessage}</div>
    }
    if (ID !== idValue && pwValue === '') {
      return <div className={styles.container}>{popUpMessage}</div>
    }
    return <div className={styles.container}>{popUpMessage}</div>
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginInner}>
        <header>
          <MoadataLogo />
        </header>
        <form>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              name='id'
              placeholder='ID'
              value={idValue}
              onChange={handleInputId}
              autoComplete='off'
              className={cx(!idValue && styles.focus)}
            />
            <div className={styles.inputIcon}>
              <LoginMailIcon className={styles.mailFavicon} />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type={show ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={pwValue}
              onChange={handleInputPassword}
              autoComplete='new-password'
              className={cx(!pwValue && styles.focus)}
            />
            <div className={styles.inputIcon}>
              <LoginLockIcon className={styles.lockFavicon} />
            </div>
            <button type='button' className={styles.showBtn} onClick={handleShowPassword}>
              {show ? (
                <span className='material-symbols-outlined'>visibility</span>
              ) : (
                <span className='material-symbols-outlined'>visibility_off</span>
              )}
            </button>
          </div>
          {isInvalid && renderFloatingMessag()}
          <button type='button' className={styles.loginBtn} onClick={handleLogin}>
            Sign in
          </button>
        </form>
        {isInvalid && <Popup popUpMessage={popUpMessage} />}
      </div>
    </div>
  )
}

export default Login
