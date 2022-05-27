import 'react-datepicker/dist/react-datepicker.css'
import styles from './datePickerUtil.module.scss'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import DatePicker from 'react-datepicker'

import { startDateState, endDateState, isDateReadOnlyState, userListState } from 'store/userManagement'
import { useRecoil } from 'hooks/state'
import dayjs from 'dayjs'
import { IUser } from 'types/userManagement'

const DatePickerUtil = () => {
  const [startDate, setStartDate] = useRecoil<Date | null>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date | null>(endDateState)
  const [isDateValueReadOnly] = useRecoil<boolean>(isDateReadOnlyState)

  const [userList] = useRecoil<IUser[]>(userListState)

  const onStartDateChange = (start: Date) => {
    setStartDate(start)
  }
  const onEndDateChange = (end: Date) => {
    setEndDate(end)
  }

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
  )
}

export default DatePickerUtil
