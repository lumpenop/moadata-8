import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cx } from 'styles'

import { useRecoil } from 'hooks/state'
import { userListState } from 'store/userManagement'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import { IUser } from 'types/userManagement'

import styles from './userTable.module.scss'
import { InfoIcon } from 'assets'

interface Props {
  setIsListHidden: Function
  isListHidden: boolean
}

const thList = ['회원번호', '로그인ID', '가입일', '상세']

const UserTable = ({ setIsListHidden, isListHidden }: Props) => {
  const [userList] = useRecoil<IUser[]>(userListState)

  return (
    <section>
      <div className={styles.userListContainer}>
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
                <tr key={user.seq} className={styles.trItem}>
                  <td>{user.seq}</td>
                  <td>{user.loginId}</td>
                  <td>{user.date}</td>
                  <td>
                    <Link
                      to={`/management/detail/${user.seq}`}
                      state={{ seq: user.seq, date: user.date, loginId: user.loginId }}
                    >
                      <InfoIcon />
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
