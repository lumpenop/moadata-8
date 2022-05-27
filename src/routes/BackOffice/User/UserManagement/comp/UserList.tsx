import { useMemo, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { cx } from 'styles'

import ButtonBasic from 'routes/_shared/ButtonBasic'

import styles from './userList.module.scss'

import { useRecoil } from 'hooks/state'
import { userListState } from 'store/userManagement'

import { IUser } from 'types/userManagement'

interface Props {
  isListHidden: boolean
}

const UserList = ({ isListHidden }: Props) => {
  const thList = useMemo(() => ['회원번호', '가입일', '로그인ID', '상세'], [])

  const [userList] = useRecoil<IUser[]>(userListState)

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
              <tr key={user.seq}>
                <td>{user.seq}</td>
                <td>{user.date}</td>
                <td>{user.login_id}</td>
                <td>
                  <Link to={`/management/detail/${user.seq}`}>
                    <ButtonBasic buttonName='상세' buttonSize='middle' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [isListHidden, userList])
  return (
    <section>
      <ul>{userItem}</ul>
    </section>
  )
}
export default UserList
