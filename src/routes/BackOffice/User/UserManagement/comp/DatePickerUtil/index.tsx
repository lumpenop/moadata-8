import { useEffect } from 'react'
import store from 'store'
import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'

import { startDateState, endDateState } from 'store/userManagement'
import { useRecoil } from 'hooks/state'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import { IUser } from 'types/userManagement'

import styles from './datePickerUtil.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  searchUserButtonClick: Function
}

const DatePickerUtil = ({ searchUserButtonClick }: Props) => {
  const [startDate, setStartDate] = useRecoil<Date>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date>(endDateState)

  const onStartDateChange = (start: Date) => {
    setStartDate(start)
  }
  const onEndDateChange = (end: Date) => {
    setEndDate(end)
  }

  useEffect(() => {
    searchUserButtonClick()
  }, [startDate, endDate])

  const setDateToday = () => {
    const today = new Date()
    setStartDate(today)
    setEndDate(today)
  }

  const setDateSevenDays = () => {
    const today = dayjs()
    const date = today.subtract(6, 'day').format()
    setStartDate(new Date(date))
    setEndDate(new Date(today.format()))
  }
  const setDateAll = () => {
    const userList: IUser[] = store.get('userManagement')
    const userDates = userList.map((item: IUser) => {
      return dayjs(item.date)
    })
    const firstDate = dayjs.min(userDates).format()
    const lastDate = dayjs.max(userDates).format()

    setStartDate(new Date(firstDate))
    setEndDate(new Date(lastDate))
  }

  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.dateLabelContainer}>
        <label htmlFor='date'>
          <span className={styles.period}>가입 기간</span>
        </label>
        <div className={styles.datePickerButtonContainer}>
          <ButtonBasic onClick={setDateToday} buttonName='오늘' buttonSize='small' />
          <ButtonBasic onClick={setDateSevenDays} buttonName='1주' buttonSize='small' />
          <ButtonBasic onClick={setDateAll} buttonName='전체' buttonSize='small' />
        </div>
      </div>
      <div className={styles.dateContainer}>
        <div className={styles.dateBox}>
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
        {/* <span className={styles.tilde}>~</span> */}
        <div className={styles.dateBox}>
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
      </div>
    </div>
  )
}

export default DatePickerUtil
