import DatePicker from 'react-datepicker'
import styles from './userDetail.module.scss'
import Button from 'components/_comon/Button'
import { MouseEvent } from 'react'
import dayjs from 'dayjs'

interface Props {
  setStartDate: (param: string) => void
  setEndDate: (param: string) => void
  setLookup: (param: string) => void
  firstDate: string
  startDate: string
  endDate: string
}

const SelectDate = ({ setStartDate, firstDate, setEndDate, startDate, setLookup, endDate }: Props) => {
  const handleLookupClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === 'today') {
      setStartDate(firstDate)
      setEndDate(firstDate)
    }
    if (e.currentTarget.value === 'week') {
      setEndDate(dayjs(startDate).add(7, 'day').format('YYYY-MM-DD'))
    }
    setLookup(e.currentTarget.value)
  }

  const handleStartDateChange = (date: Date) => {
    setLookup('custom')
    setStartDate(dayjs(date).format('YYYY-MM-DD'))
  }

  const handleEndDateChange = (date: Date) => {
    setLookup('custom')
    setEndDate(dayjs(date).format('YYYY-MM-DD'))
  }
  return (
    <div className={styles.date}>
      <div className={styles.dateTop}>
        <h1 className={styles.title}>조회 기간</h1>
        <div className={styles.buttonWrap}>
          <Button title='오늘' value='today' onClick={handleLookupClick} />
          <Button title='1주일' value='week' onClick={handleLookupClick} />
          <Button title='전체' value='entire' onClick={handleLookupClick} />
        </div>
      </div>
      <div className={styles.datePickerInputWrap}>
        <DatePicker
          dateFormat='yy-MM-dd'
          minDate={new Date(firstDate)}
          selected={new Date(startDate)}
          onChange={handleStartDateChange}
        />
      </div>
      <span>~</span>
      <div className={styles.datePickerInputWrap}>
        <DatePicker
          dateFormat='yy-MM-dd'
          minDate={new Date(startDate)}
          selected={new Date(endDate)}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  )
}

export default SelectDate
