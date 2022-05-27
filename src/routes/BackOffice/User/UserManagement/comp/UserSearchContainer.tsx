import { ChangeEvent, KeyboardEvent } from 'react'
import styles from './userSearchContainer.module.scss'
import { useRecoil } from 'hooks/state'
import { loginValueState, numValueState, isLoginReadOnlyState, isNumReadOnlyState } from 'store/userManagement'

interface Props {
  searchUserButtonClick: Function
}

const UserSearchContainer = ({ searchUserButtonClick }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [isLoginValueReadOnly] = useRecoil<boolean>(isLoginReadOnlyState)
  const [isNumValueReadOnly] = useRecoil<boolean>(isNumReadOnlyState)

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.currentTarget.value)
  }
  const handleUserIdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumValue(event.currentTarget.value)
  }

  const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchUserButtonClick()
    }
  }

  return (
    <div className={styles.searchFormBodyContainer}>
      <div className={styles.searchFormBody}>
        <label htmlFor='userId' className={styles.login}>
          로그인 ID
        </label>
        <input
          name='userId'
          type='text'
          value={loginValue}
          onChange={handleLoginInputChange}
          readOnly={isLoginValueReadOnly}
          onKeyPress={inputEnterPress}
        />
      </div>
      <div className={styles.searchFormBody}>
        <label htmlFor='userNum' className={styles.userNum}>
          회원번호
        </label>
        <input
          name='userNum'
          type='number'
          value={numValue}
          readOnly={isNumValueReadOnly}
          onChange={handleUserIdInputChange}
          onKeyPress={inputEnterPress}
        />
      </div>
    </div>
  )
}

export default UserSearchContainer
