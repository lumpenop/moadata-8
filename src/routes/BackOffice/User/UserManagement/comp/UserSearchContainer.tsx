import { ChangeEvent, KeyboardEvent, useCallback, useMemo } from 'react'
import styles from './userSearchContainer.module.scss'
import { useRecoil, usePrevious } from 'hooks/state'
import {
  loginValueState,
  numValueState,
  isLoginReadOnlyState,
  isNumReadOnlyState,
  userListState,
} from 'store/userManagement'

import { IUser } from 'types/userManagement'

import store from 'store'

interface Props {
  searchUserButtonClick: Function
}

const UserSearchContainer = ({ searchUserButtonClick }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [isLoginValueReadOnly] = useRecoil<boolean>(isLoginReadOnlyState)
  const [isNumValueReadOnly] = useRecoil<boolean>(isNumReadOnlyState)

  const [userList, setUserList] = useRecoil<IUser[]>(userListState)

  const prevLoginValue = usePrevious(loginValue)
  const prevNumValue = usePrevious(numValue)

  const handleLoginIdInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.currentTarget.value
      setLoginValue(targetValue)
    },
    [prevLoginValue?.length]
  )
  const handleUserNumInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const targetValue = event.currentTarget.value
      setNumValue(targetValue)
    },
    [prevNumValue?.length]
  )

  const inputEnterPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') searchUserButtonClick()
    },
    [searchUserButtonClick]
  )

  const userIdInput = useMemo(() => {
    return (
      <input
        name='userId'
        type='text'
        value={loginValue}
        onChange={handleLoginIdInputChange}
        readOnly={isLoginValueReadOnly}
        onKeyPress={inputEnterPress}
      />
    )
  }, [loginValue, handleLoginIdInputChange, isLoginValueReadOnly, inputEnterPress])

  const userNumInput = useMemo(() => {
    return (
      <input
        name='userId'
        type='text'
        value={numValue}
        onChange={handleUserNumInputChange}
        readOnly={isNumValueReadOnly}
        onKeyPress={inputEnterPress}
      />
    )
  }, [numValue, handleUserNumInputChange, isNumValueReadOnly, inputEnterPress])

  return (
    <div className={styles.searchFormBodyContainer}>
      <div className={styles.searchFormBody}>
        <label htmlFor='userId' className={styles.login}>
          로그인 ID
        </label>
        {userIdInput}
      </div>
      <div className={styles.searchFormBody}>
        <label htmlFor='userNum' className={styles.userNum}>
          회원번호
        </label>
        {userNumInput}
      </div>
    </div>
  )
}

export default UserSearchContainer
