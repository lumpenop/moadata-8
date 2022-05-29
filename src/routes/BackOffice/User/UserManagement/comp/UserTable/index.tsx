import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { userListState } from 'store/userManagement'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import { IUser } from 'types/userManagement'

import styles from './userTable.module.scss'

interface Props {
  setIsListHidden: Function
  isListHidden: boolean
}

const thList = ['회원번호', '가입일', '로그인ID', '상세']

const UserTable = ({ setIsListHidden, isListHidden }: Props) => {
  const [userList] = useRecoil<IUser[]>(userListState)
  const [userListLength, setUserListLength] = useState(0)
  useEffect(() => {
    setUserListLength(userList.length)
    if (userList.length === 0) setIsListHidden(true)
  }, [userList])

  return (
    <section>
      <div className={styles.userListContainer}>
        <p>
          전체 중 <mark>{userListLength}</mark> 명의 회원이 검색되었습니다.
        </p>
        <div className={styles.userListWrapper}>
          <table className={styles.userListTable}>
            <thead>
              <tr>
                {thList.map((thItem) => (
                  <th key={thItem} className={styles.userListSubject}>
                    {thItem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cx({ [styles.listHidden]: isListHidden })}>
              {userList.map((user) => (
                <tr key={user.seq}>
                  <td>{user.seq}</td>
                  <td>{user.date}</td>
                  <td>{user.login_id}</td>
                  <td>
                    <Link
                      to={`/management/detail/${user.seq}`}
                      state={{ seq: user.seq, date: user.date, login_id: user.login_id }}
                    >
                      <ButtonBasic buttonName='상세' buttonSize='middle' />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
export default UserTable
