import { useMemo, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { cx } from 'styles'

import ButtonBasic from 'routes/_shared/ButtonBasic'
import UserDetail from '../../UserDetail'

import styles from './userList.module.scss'

interface IUser {
  seq: number
  member_seq: string
  date: string
  id: string
}

interface Props {
  userList: IUser[]
  isListHidden: boolean
}

const UserList = ({ userList, isListHidden }: Props) => {
  const thList = useMemo(() => ['회원번호', '가입일', '로그인ID', '상세'], [])
  useEffect(() => {
    console.log(isListHidden)
  }, [isListHidden])
  const userItem = useMemo(() => {
    return (
      <div className={styles.userListContainer}>
        <p>
          전체 중 <mark>{isListHidden ? 0 : userList.length}</mark> 명의 회원이 검색되었습니다.
        </p>
        <table className={styles.userListTable}>
          <thead>
            <tr>
              {thList.map((thItem) => {
                return (
                  <th key={thItem} className={styles.userListSubject}>
                    {thItem}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className={cx({ [styles.listHidden]: isListHidden })}>
            {userList.map((user) => (
              <tr key={user.member_seq}>
                <td>{user.member_seq}</td>
                <td>{user.date}</td>
                <td>{user.id}</td>
                <td>
                  <Link to={`/detail/${user.member_seq}`}>
                    <ButtonBasic buttonName='상세' buttonSize='middle' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [userList, isListHidden])
  return (
    <section>
      <ul>{userItem}</ul>
    </section>
  )
}
export default UserList
