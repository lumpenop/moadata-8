import Popup from './Popup'
import styles from './login.module.scss'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import cx from 'classnames'
import { authState } from 'store/auth'
import { MoadataLogo } from 'assets'

const ID = process.env.REACT_APP_ADMIN_ID
const PW = process.env.REACT_APP_ADMIN_PASSWORD

const Login = () => {
  const navigate = useNavigate()
  const [isInvalid, setIsInvalid] = useState(false)
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [show, setShow] = useState(false)
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

  const handleShowPassword = () => {
    setShow(!show)
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
      <div className={styles.loginInner}>
        <header>
          <MoadataLogo />
        </header>
        <form>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              name='id'
              placeholder='id'
              value={idValue}
              onChange={handleInputId}
              autoComplete='off'
              className={cx(!idValue && styles.focus)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type={show ? 'text' : 'password'}
              name='password'
              placeholder='password'
              value={pwValue}
              onChange={handleInputPassword}
              autoComplete='new-password'
              className={cx(!pwValue && styles.focus)}
            />
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
            Login
          </button>
        </form>
        {isInvalid && <Popup idValue={idValue} pwValue={pwValue} id={ID} pw={PW} />}
      </div>
    </div>
  )
}

export default Login
