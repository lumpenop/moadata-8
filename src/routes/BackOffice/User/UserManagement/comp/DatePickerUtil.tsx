import 'react-datepicker/dist/react-datepicker.css'
import styles from './datePickerUtil.module.scss'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import DatePicker from 'react-datepicker'

import { startDateState, endDateState, userListState, loginValueState, numValueState } from 'store/userManagement'
import { useRecoil, useResetRecoilState } from 'hooks/state'
import { useMemo, useCallback } from 'react'
import dayjs from 'dayjs'
import { IUser, IHeartrate } from 'types/userManagement'
import store from 'store'

interface Props {
  searchUserButtonClick: Function
}

const DatePickerUtil = ({ searchUserButtonClick }: Props) => {
  const [startDate, setStartDate] = useRecoil<Date>(startDateState)
  const [endDate, setEndDate] = useRecoil<Date>(endDateState)

  const resetStartDateList = useResetRecoilState(startDateState)
  const resetEndDateList = useResetRecoilState(endDateState)

  const [loginValue, setLoginValue] = useRecoil<string>(loginValueState)
  const [numValue, setNumValue] = useRecoil<string>(numValueState)

  const searchedUser = useMemo(() => {
    const userList: IUser[] = store.get('userManagement')
    if (loginValue) {
      const result: IUser[] = userList.filter((item: IUser) => {
        return item.login_id === loginValue
      })
      return result[0]
    }
    if (numValue) {
      const result: IUser[] = userList.filter((item: IUser) => {
        return item.seq === Number(numValue)
      })
      return result[0]
    }
    return userList[0]
  }, [loginValue, numValue])

  const onStartDateChange = (start: Date) => {
    setStartDate(start)
  }
  const onEndDateChange = (end: Date) => {
    setEndDate(end)
  }

  const setDateToday = () => {
    if (!loginValue && !numValue) return
    const userJoinDate = new Date(searchedUser.date)
    setStartDate(userJoinDate)
    setEndDate(userJoinDate)
    searchUserButtonClick()
  }

  const setDateSevenDays = () => {
    if (!loginValue && !numValue) return
    const userJoinDate = new Date(searchedUser.date)
    const today = dayjs(userJoinDate)
    const date = today.add(7, 'day').format()
    setStartDate(new Date(today.format()))
    setEndDate(new Date(date))
    searchUserButtonClick()
  }
  const setDateAll = useCallback(() => {
    const userJoinDate = new Date(searchedUser.date)
    const heartrateList: IHeartrate[] = store.get('heartrate')
    const userNumValue = searchedUser.seq
    const userHeartrateArr = heartrateList.filter((item: IHeartrate) => {
      return item.member_seq === Number(userNumValue)
    })

    console.log(userHeartrateArr[0])

    let formatedJoindate = dayjs(userJoinDate).format('YYYY-MM-DD')
    userHeartrateArr.forEach((item: IHeartrate) => {
      const itemFormatDate = dayjs(item.crt_ymdt).format('YYYY-MM-DD')
      if (formatedJoindate < itemFormatDate) formatedJoindate = itemFormatDate
    })
    setStartDate(userJoinDate)
    setEndDate(new Date(formatedJoindate))
    searchUserButtonClick()
  }, [loginValue, numValue])

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
