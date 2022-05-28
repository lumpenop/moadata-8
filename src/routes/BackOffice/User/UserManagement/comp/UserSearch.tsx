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
import UserSearchContainer from './UserSearchContainer'
import { IUser } from 'types/userManagement'
import DatePickerUtil from './DatePickerUtil'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

import { searchUserByLoginId, searchUserByUserNum, searchUserByDate } from 'utils/user/userSearchUtil'

interface Props {
  setIsListHidden: Function
}

const UserSearch = ({ setIsListHidden }: Props) => {
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
    setIsListHidden(false)
    !(isLoginValueReadOnly && isNumValueReadOnly) ?? setIsDisabledButton(true)
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
    const userList = store.get('userManagement')
    console.log(searchUserByDate(searchUserByLoginId(loginValue)))
    if (loginValue) setUserList(searchUserByDate(searchUserByLoginId(loginValue)))
    if (numValue) setUserList(searchUserByDate(searchUserByUserNum(numValue)))
    console.log(searchUserByDate(userList))
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
    setIsListHidden(false)
    resetData()
  }

  return (
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
  )
}

export default UserSearch
