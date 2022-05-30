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
      <div className={styles.searchLabelBox}>
        <label htmlFor='userId' className={styles.login}>
          <span>로그인 ID</span>
        </label>
        <label htmlFor='userNum' className={styles.userNum}>
          <span>회원 번호</span>
        </label>
      </div>
      <div className={styles.searchFormBodyBox}>
        <div className={styles.searchFormBody}>
          <input
            id='userId'
            className='userInput'
            type='text'
            value={loginValue}
            onChange={handleLoginIdInputChange}
            readOnly={isLoginValueReadOnly}
            onKeyPress={inputEnterPress}
          />
        </div>
        <div className={styles.searchFormBody}>
          <input
            id='userNum'
            className='userInput'
            type='text'
            value={numValue}
            onChange={handleUserNumInputChange}
            readOnly={isNumValueReadOnly}
            onKeyPress={inputEnterPress}
          />
        </div>
      </div>
    </div>
  )
}

export default UserSearchContainer
