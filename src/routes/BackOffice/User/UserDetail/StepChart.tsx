import Button from 'components/_comon/Button'
import { ChangeEvent, MouseEvent, useState } from 'react'
import styles from './userDetail.module.scss'

interface Props {}

const StepChart = (props: Props) => {
  const [lookup, setLookup] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const handleLooupClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLookup(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('start:', e.currentTarget.value)
  }

  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
  }
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle}>
        <p>걸음수</p>
      </div>
      <div className={styles.chartWrap}>Chart</div>
      <div className={styles.info}>
        <p className={styles.infoText}>2022-04-20 ~ 2022-04-20 </p>
        <p className={styles.infoText}>총 13,203걸음</p>
      </div>
      <div className={styles.chartTitle}>
        <p>조회 기간</p>
      </div>
      <input onChange={handleChangeStartDate} className={styles.datePicker} type='date' />~
      <input onChange={handleChangeEndDate} className={styles.datePicker} type='date' />
      <div className={styles.buttonWrap}>
        <Button title='오늘' value='today' onClick={handleLooupClick} />
        <Button title='1주일' value='week' onClick={handleLooupClick} />
        <Button title='전체' value='entire' onClick={handleLooupClick} />
      </div>
    </div>
  )
}

export default StepChart
