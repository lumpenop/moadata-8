import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import styles from './userSearch.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

import ButtonBasic from 'routes/_shared/ButtonBasic'

import dayjs from 'dayjs'

const userList = [
  { num: 1, date: '2022-05-22', id: 'id1' },
  { num: 2, date: '2022-04-22', id: 'id2' },
  { num: 3, date: '2022-03-22', id: 'id3' },
  { num: 4, date: '2022-02-22', id: 'id4' },
]

const dataSearchClick = () => {
  // userList
}

const UserSearch = () => {
  const [startDate, setStartDate] = useState(new Date('2022-05-22'))
  const [endDate, setEndDate] = useState(new Date('2022-05-26'))

  const onStartDateChange = (start: Date) => {
    setStartDate(start)
  }

  const onEndDateChange = (end: Date) => {
    setEndDate(end)
  }

  const setDateToday = () => {
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const setDateAll = () => {
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
  const setDateSevenDays = () => {
    const today = dayjs()
    const date = today.subtract(7, 'day').format()
    setStartDate(new Date(date))
    setEndDate(new Date())
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
          <div className={styles.searchFormBodyContainer}>
            <div className={styles.searchFormBody}>
              <label htmlFor='userId' className={styles.login}>
                로그인 ID
              </label>
              <input name='userId' type='text' />
            </div>

            <div className={styles.searchFormBody}>
              <label htmlFor='userNum' className={styles.userNum}>
                회원번호
              </label>
              <input form='userNum' name='userId' type='text' />
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
              <ButtonBasic buttonName='필터 초기화' buttonSize='large' />
              <ButtonBasic buttonName='검색' buttonSize='large' />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserSearch
