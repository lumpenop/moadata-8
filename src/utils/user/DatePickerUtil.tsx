import 'react-datepicker/dist/react-datepicker.css'
import styles from './datePickerUtil.module.scss'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import DatePicker from 'react-datepicker'

import { startDateState, endDateState, userListState } from 'store/userManagement'
import { useRecoil, useResetRecoilState } from 'hooks/state'
import dayjs from 'dayjs'
import { IUser } from 'types/userManagement'

const DatePickerUtil = () => {
  const [startDate, setStartDate] = useRecoil<Date>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date>(endDateState)

  const resetStartDateList = useResetRecoilState(startDateState)
  const resetEndDateList = useResetRecoilState(endDateState)

  const [userList] = useRecoil<IUser[]>(userListState)

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

  const setDateSevenDays = () => {
    const today = dayjs()
    const date = today.subtract(7, 'day').format()
    setStartDate(new Date(date))
    setEndDate(new Date())
  }

  const setDateAll = () => {
    resetStartDateList()
    resetEndDateList()
  }

  return (
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
  )
}

export default DatePickerUtil
