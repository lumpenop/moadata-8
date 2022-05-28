import { useEffect, useState,KeyboardEvent } from 'react'
import dayjs from 'dayjs'
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
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import styles from './userSearch.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { useRecoil, useResetRecoilState } from 'hooks/state'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import UserSearchContainer from './UserSearchContainer'
import { IUser } from 'types/userManagement'
import DatePickerUtil from 'utils/user/DatePickerUtil'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

interface Props {
  setIsListHidden: Function
}

const UserSearch = ({ setIsListHidden }: Props) => {
  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)
  const [startDate, setStartDate] = useRecoil<Date>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date>(endDateState)
  const [isLoginValueReadOnly, setIsLoginValueReadOnly] = useRecoil(isLoginReadOnlyState)
  const [isNumValueReadOnly, setIsNumValueReadOnly] = useRecoil(isNumReadOnlyState)
  const [, setUserList] = useRecoil<IUser[]>(userListState)

  const resetStartDateList = useResetRecoilState(startDateState)
  const resetEndDateList = useResetRecoilState(endDateState)

  useEffect(() => {
    handleReadonly()
    setIsListHidden(false)
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
    const userList = store.get('userManagement')
    if (loginValue) setUserList(searchUserByLoginId(searchUserByDate(userList)))
    if (numValue) setUserList(searchUserByUserNum(searchUserByDate(userList)))
    else setUserList(() => searchUserByDate(userList))

    console.log(searchUserByDate(userList))
  }

  const resetData = () => {
    resetStartDateList()
    resetEndDateList()
    setLoginValue('')
    setNumValue('')
    setUserList(store.get('userManagement'))
  }

  const searchUserByDate = (items: IUser[]) => {
    const start = dayjs(startDate).format('YYYY-MM-DD')
    const end = dayjs(endDate).format('YYYY-MM-DD')
    const result = items.filter((item: IUser) => {
      const userDate = dayjs(item.date).format('YYYY-MM-DD')
      return userDate >= start && userDate <= end
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return []
    }
    return result
  }

  const searchUserByLoginId = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return item.login_id === loginValue
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return []
    }
    return result
  }

  const searchUserByUserNum = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return numValue === item.seq
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return []
    }
    return result
  }

  const resetSearchButtonClick = () => {
    resetReadOnly()
    setIsListHidden(false)
    resetData()
  }

  return (
    <>
      <div className={styles.pathInfo}>
        <Link to='/user'>
          <span>홈</span>
        </Link>
        <span>{'>'}</span>
        <Link to='/management'>
          <span>회원관리</span>
        </Link>
      </div>
      <div className={styles.searchFormBox}>
        <form className={styles.searchForm}>
          <UserSearchContainer searchUserButtonClick={searchUserButtonClick} />
          <DatePickerUtil />
          <div className={styles.userSearchButtonContainer}>
            <div className={styles.userSearchButtonBox}>
              <ButtonBasic onClick={resetSearchButtonClick} buttonName='필터 초기화' buttonSize='large' />
              <ButtonBasic onClick={searchUserButtonClick} buttonName='검색' buttonSize='large' />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserSearch
