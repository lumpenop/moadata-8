import Popup from './Popup'
import styles from './login.module.scss'
import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import crypto from 'crypto'

const Login = () => {
  const admin = {
    id: process.env.REACT_APP_ADMIN_ID as string,
    pw: process.env.REACT_APP_ADMIN_PASSWORD as string,
  }
  const { id, pw } = admin

  // const createHashedPassword = (password: string) => {
  //   return crypto.createHash('sha512').update(password).digest('base64')
  // }

  // console.log(createHashedPassword(admin.pw))

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
    if (id === idValue && pw === pwValue) {
      setIsInvalid(false)
      navigate('/user')
    } else {
      setIsInvalid(true)
    }
  }

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
      {isInvalid && <Popup idValue={idValue} pwValue={pwValue} id={id} pw={pw} />}
    </div>
  )
}

export default Login
