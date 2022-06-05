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
import UserSearchContainer from '../UserInputContainer'
import { IUser } from 'types/userManagement'
import DatePickerUtil from '../DatePickerUtil'
import { searchUserByLoginId, searchUserByUserNum, searchUserByDate } from 'utils/user/userSearchUtil'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

interface Props {
  setIsListHidden: Function
}

const UserSearch = ({ setIsListHidden }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [startDate] = useRecoil<Date>(startDateState)
  const [endDate] = useRecoil<Date>(endDateState)
  const [, setIsLoginValueReadOnly] = useRecoil(isLoginReadOnlyState)
  const [, setIsNumValueReadOnly] = useRecoil(isNumReadOnlyState)
  const [userList, setUserList] = useRecoil<IUser[]>(userListState)

  const [isDisabledButton] = useState(false)
  const resetStartDateList = useResetRecoilState(startDateState)
  const resetEndDateList = useResetRecoilState(endDateState)

  const [userListLength, setUserListLength] = useState(0)
  useEffect(() => {
    setUserListLength(userList.length)
    if (userList.length === 0) setIsListHidden(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList])

  useEffect(() => {
    handleReadonly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <h2 className={styles.userSearchTitle}>회원 검색</h2>
      <div className={styles.searchFormBox}>
        <form className={styles.searchForm}>
          <DatePickerUtil searchUserButtonClick={searchUserButtonClick} />
          <UserSearchContainer searchUserButtonClick={searchUserButtonClick} />
          <div className={styles.functionButtonCotainer}>
            <ButtonBasic onClick={resetSearchButtonClick} buttonName='초기화' buttonSize='large' />
            <ButtonBasic onClick={searchUserButtonClick} buttonName='검색' buttonSize='large' />
          </div>
        </form>
        <div className={styles.buttonBox}>
          <p>
            전체 중 <mark>{userListLength}</mark> 명의 회원이 검색되었습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSearch
