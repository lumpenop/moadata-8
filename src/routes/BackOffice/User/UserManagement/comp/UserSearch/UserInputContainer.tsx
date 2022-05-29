import { ChangeEvent, KeyboardEvent, useCallback } from 'react'
import styles from './userInputContainer.module.scss'
import { useRecoil, usePrevious } from 'hooks/state'
import { loginValueState, numValueState, isLoginReadOnlyState, isNumReadOnlyState } from 'store/userManagement'

interface Props {
  searchUserButtonClick: Function
}

const UserSearchContainer = ({ searchUserButtonClick }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [isLoginValueReadOnly] = useRecoil<boolean>(isLoginReadOnlyState)
  const [isNumValueReadOnly] = useRecoil<boolean>(isNumReadOnlyState)

  const prevLoginValue = usePrevious(loginValue)
  const prevNumValue = usePrevious(numValue)

  const handleLoginIdInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.currentTarget.value
      setLoginValue(targetValue.replace(' ', ''))
    },
    [prevLoginValue?.length]
  )
  const handleUserNumInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.currentTarget.value
      setNumValue(targetValue.replace(' ', ''))
    },
    [prevNumValue?.length]
  )

  const inputEnterPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') searchUserButtonClick()
    },
    [searchUserButtonClick]
  )

  return (
    <div className={styles.searchFormBodyContainer}>
      <div className={styles.searchFormBody}>
        <label htmlFor='userId' className={styles.login}>
          로그인 ID
        </label>
        <input
          id='userId'
          type='text'
          value={loginValue}
          onChange={handleLoginIdInputChange}
          readOnly={isLoginValueReadOnly}
          onKeyPress={inputEnterPress}
        />
      </div>
      <div className={styles.searchFormBody}>
        <label htmlFor='userNum' className={styles.userNum}>
          회원번호
        </label>
        <input
          id='userNum'
          type='text'
          value={numValue}
          onChange={handleUserNumInputChange}
          readOnly={isNumValueReadOnly}
          onKeyPress={inputEnterPress}
        />
      </div>
    </div>
  )
}

export default UserSearchContainer
