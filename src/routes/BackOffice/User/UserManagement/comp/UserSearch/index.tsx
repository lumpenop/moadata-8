import { useEffect, useState } from 'react'
import store from 'store'

import {
  endDateState,
  isLoginReadOnlyState,
  isNumReadOnlyState,
  loginValueState,
  numValueState,
  startDateState,
  userListState,
} from 'store/userManagement'
import { useRecoil, useResetRecoilState } from 'hooks/state'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import UserSearchContainer from './UserInputContainer'
import { IUser } from 'types/userManagement'
import DatePickerUtil from '../DatePickerUtil'
import { searchUserByLoginId, searchUserByUserNum, searchUserByDate } from 'utils/user/userSearchUtil'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

const UserSearch = () => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [startDate] = useRecoil<Date>(startDateState)
  const [endDate] = useRecoil<Date>(endDateState)
  const [isLoginValueReadOnly, setIsLoginValueReadOnly] = useRecoil(isLoginReadOnlyState)
  const [isNumValueReadOnly, setIsNumValueReadOnly] = useRecoil(isNumReadOnlyState)
  const [, setUserList] = useRecoil<IUser[]>(userListState)

  const [isDisabledButton, setIsDisabledButton] = useState(false)
  const resetStartDateList = useResetRecoilState(startDateState)
  const resetEndDateList = useResetRecoilState(endDateState)

  useEffect(() => {
    handleReadonly()
  }, [startDate, loginValue, numValue, endDate])

  const handleReadonly = () => {
    if (loginValue !== '') {
      setIsNumValueReadOnly(true)
      return
    }
    if (numValue !== '') {
      setIsLoginValueReadOnly(true)
      return
    }
    resetReadOnly()
  }

  const resetReadOnly = () => {
    setIsLoginValueReadOnly(false)
    setIsNumValueReadOnly(false)
  }

  const searchUserButtonClick = () => {
    if (isDisabledButton) return
    if (loginValue) setUserList(searchUserByDate(startDate, endDate, searchUserByLoginId(loginValue)))
    else setUserList(searchUserByDate(startDate, endDate, searchUserByUserNum(numValue)))
  }

  const resetData = () => {
    resetStartDateList()
    resetEndDateList()
    setLoginValue('')
    setNumValue('')
    setUserList(store.get('userManagement'))
  }

  const resetSearchButtonClick = () => {
    resetReadOnly()
    resetData()
  }

  return (
    <div className={styles.userSearchContainer}>
      <p className={styles.userSearchTitle}>회원 검색</p>
      <div className={styles.searchFormBox}>
        <form className={styles.searchForm}>
          <UserSearchContainer searchUserButtonClick={searchUserButtonClick} />
          <DatePickerUtil searchUserButtonClick={searchUserButtonClick} />
          <div className={styles.userSearchButtonContainer}>
            <div className={styles.userSearchButtonBox}>
              <ButtonBasic onClick={resetSearchButtonClick} buttonName='필터 초기화' buttonSize='large' />
              <ButtonBasic onClick={searchUserButtonClick} buttonName='검색' buttonSize='large' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSearch
