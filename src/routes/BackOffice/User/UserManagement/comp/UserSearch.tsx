import { useState, ChangeEvent, useEffect, KeyboardEvent } from 'react'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'

import ButtonBasic from 'routes/_shared/ButtonBasic'
import USER_LIST from 'data/user_list.json'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './userSearch.module.scss'

interface IUser {
  seq: number
  member_seq: string
  date: string
  id: string
}
interface Props {
  setUserList: Function
  userList: IUser[]
  setIsListHidden: Function
}

const UserSearch = ({ setUserList, userList, setIsListHidden }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()

  const [loginValue, setLoginValue] = useState<string>('')
  const [numValue, setNumValue] = useState<string>('')

  const [isLoginValueReadOnly, setIsLoginValueReadOnly] = useState(false)
  const [isNumValueReadOnly, setIsNumValueReadOnly] = useState(false)
  const [isDateValueReadOnly, setIsDateValueReadOnly] = useState(false)

  useEffect(() => {
    handleReadonly()
    setIsListHidden(false)
  }, [startDate, loginValue, numValue, endDate])

  // Input 값-------------------------------------
  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.currentTarget.value)
  }
  const handleUserIdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumValue(event.currentTarget.value)
  }
  const onStartDateChange = (start: Date) => {
    setStartDate(start)
  }
  const onEndDateChange = (end: Date) => {
    setEndDate(end)
  }

  // 날짜 범위 버튼들-------------------------------------
  const setDateToday = () => {
    if (isDateValueReadOnly) return
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const setDateSevenDays = () => {
    if (isDateValueReadOnly) return
    const today = dayjs()
    const date = today.subtract(7, 'day').format()
    setStartDate(new Date(date))
    setEndDate(new Date())
  }

  const setDateAll = () => {
    if (isDateValueReadOnly) return
    let oldest = userList[0].date
    let lately = '0'
    userList.forEach((item) => {
      const date = dayjs(item.date).format('YYYY-MM-DD')
      if (oldest > date) oldest = date
      if (lately < date) lately = date
    })
    setStartDate(new Date(oldest))
    setEndDate(new Date(lately))
  }

  // 리셋 버튼-------------------------------------
  const resetSearchButtonClick = () => {
    resetReadOnly()
    setIsListHidden(false)
    resetData()
  }

  const resetData = () => {
    setStartDate(null)
    setEndDate(null)
    setLoginValue('')
    setNumValue('')
    setUserList(USER_LIST)
  }

  const resetReadOnly = () => {
    setIsDateValueReadOnly(false)
    setIsLoginValueReadOnly(false)
    setIsNumValueReadOnly(false)
  }

  // 검색 로직-------------------------------------
  const searchUserByDate = (items: IUser[]) => {
    const start = dayjs(startDate).format('YYYY-MM-DD')
    const end = dayjs(endDate).format('YYYY-MM-DD')
    const result = items.filter((item: IUser) => {
      const userDate = dayjs(item.date).format('YYYY-MM-DD')
      return userDate >= start && userDate <= end
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(result)
  }

  const searchUserByLoginId = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return item.id === loginValue
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(result)
  }

  const searchUserByMemberSeq = (items: IUser[]) => {
    const result = items.filter((item: IUser) => {
      return numValue === item.member_seq
    })
    if (result.length === 0) {
      setIsListHidden(true)
      return
    }
    setUserList(result)
  }

  // 검색 클릭-------------------------------------
  const searchUserButtonClick = () => {
    if (isLoginValueReadOnly === false) searchUserByLoginId(userList)
    if (isNumValueReadOnly === false) searchUserByMemberSeq(userList)
    if (isDateValueReadOnly === false) searchUserByDate(userList)
  }

  const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchUserButtonClick()
    }
  }

  // Read only-------------------------------------
  const handleReadonly = () => {
    if (loginValue !== '') {
      setIsNumValueReadOnly(true)
      setIsDateValueReadOnly(true)
      return
    }
    if (numValue !== '') {
      setIsLoginValueReadOnly(true)
      setIsDateValueReadOnly(true)
      return
    }
    if (startDate || endDate) {
      setIsLoginValueReadOnly(true)
      setIsNumValueReadOnly(true)
      return
    }
    resetReadOnly()
  }
  return (
    <div className={styles.searchFormBox}>
      <form className={styles.searchForm}>
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
              form='userNum'
              name='userId'
              type='number'
              value={numValue}
              readOnly={isNumValueReadOnly}
              onChange={handleUserIdInputChange}
              onKeyPress={inputEnterPress}
            />
          </div>
        </div>
        <div className={styles.datePickerContainer}>
          <label htmlFor='date' className={styles.period}>
            조회기간
          </label>
          <div className={styles.date}>
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat='yyyy년 MM월 dd일'
              name='date'
              readOnly={isDateValueReadOnly}
            />
          </div>
          <span className={styles.tilde}>~</span>
          <div className={styles.date}>
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat='yyyy년 MM월 dd일'
              name='date'
              readOnly={isDateValueReadOnly}
            />
          </div>
          <div className={styles.datePickerButtonContainer}>
            <ButtonBasic onClick={setDateToday} buttonName='오늘' buttonSize='small' />
            <ButtonBasic onClick={setDateSevenDays} buttonName='1주일' buttonSize='small' />
            <ButtonBasic onClick={setDateAll} buttonName='전체' buttonSize='small' />
          </div>
        </div>
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
