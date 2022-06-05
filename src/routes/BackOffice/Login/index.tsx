import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import cx from 'classnames'

import { authState } from 'store/auth'
import Popup from './Popup'
import { LoginLockIcon, LoginMailIcon, PasswordEye, PasswordSlashEye } from 'assets'
import Logo from 'assets/images/logo.png'
import styles from './login.module.scss'

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID
const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD

let popupDelay: NodeJS.Timer

const Login = () => {
  const setAuth = useSetRecoilState(authState)

  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [popupMessage, setPopupMessage] = useState('')

  const [isInvalid, setIsInvalid] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const navigate = useNavigate()

  const inputIdRef = useRef<HTMLInputElement>(null)
  const inputPwRef = useRef<HTMLInputElement>(null)

  const handleInputId = (e: ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.currentTarget.value)
    setIsInvalid(false)
  }

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.currentTarget.value)
    setIsInvalid(false)
  }

  const handleShowPassword = () => {
    setShowPw((prev) => !prev)
  }

  const handleLogin = () => {
    if (ADMIN_ID === idValue && ADMIN_PW === pwValue) {
      setIsInvalid(false)
      setAuth(true)
      sessionStorage.setItem('user', idValue)
      navigate('/user')
    } else {
      setIsInvalid(true)
      setAuth(false)
    }
  }

  const onSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!idValue) {
      setPopupMessage('아이디를 입력해주세요.')
      inputIdRef.current?.focus()
    }

    if (idValue && !pwValue) {
      setPopupMessage('비밀번호를 입력해주세요.')
      inputPwRef.current?.focus()
    }

    if (ADMIN_ID === idValue && ADMIN_PW !== pwValue) {
      setPopupMessage('비밀번호가 다릅니다.')
      inputPwRef.current?.focus()
    }

    if (ADMIN_ID !== idValue && pwValue) {
      setPopupMessage('존재하지 않는 ID입니다.')
      inputIdRef.current?.focus()
    }
    handleLogin()
    setShowPopup(true)

    if (popupDelay) clearTimeout(popupDelay)
    popupDelay = setTimeout(() => {
      setShowPopup(false)
    }, 1200)
  }

  useEffect(() => {
    inputIdRef.current?.focus()
  }, [])

  useEffect(() => {
    const isValues = !idValue || !pwValue
    isValues && setPopupMessage('')
    isInvalid && setPopupMessage('')
  }, [idValue, pwValue, isInvalid])

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginInner}>
        <header>
          <img src={Logo} alt='logo' />
        </header>
        <form onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              name='id'
              placeholder='ID'
              value={idValue}
              onChange={handleInputId}
              autoComplete='off'
              ref={inputIdRef}
            />
            <div className={styles.inputIcon}>
              <LoginMailIcon />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={showPw ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={pwValue}
              onChange={handleInputPassword}
              autoComplete='new-password'
              ref={inputPwRef}
            />
            <div className={styles.inputIcon}>
              <LoginLockIcon />
            </div>
            <button type='button' className={styles.showBtn} onClick={handleShowPassword}>
              {showPw ? <PasswordEye /> : <PasswordSlashEye />}
            </button>
          </div>

          <div
            className={cx(styles.container, {
              [styles.fadein]: showPopup === true,
            })}
          >
            {popupMessage}
          </div>
          <button type='submit' className={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>
        </form>
        {isInvalid && <Popup popupMessage={popupMessage} showPopup={showPopup} />}
      </div>
    </div>
  )
}

export default Login
