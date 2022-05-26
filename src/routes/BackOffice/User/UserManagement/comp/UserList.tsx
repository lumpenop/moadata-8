import { useMemo } from 'react'
import ButtonBasic from 'routes/_shared/ButtonBasic'
import styles from './userLIst.module.scss'

const userList = [
  { num: 1, date: '2022-05-22', id: 'id1' },
  { num: 2, date: '2022-04-22', id: 'id2' },
  { num: 3, date: '2022-03-22', id: 'id3' },
  { num: 4, date: '2022-02-22', id: 'id4' },
]
const UserList = () => {
  const thList = useMemo(() => ['회원번호', '가입일', '로그인ID', '상세'], [])

  const userItem = useMemo(() => {
    return (
      <div className={styles.userListContainer}>
        {/* 전체 중 1명의 회원이 검색되었습니다. */}
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
          <tbody>
            {userList.map((user) => (
              <tr key={user.num}>
                <td>{user.num}</td>
                <td>{user.date}</td>
                <td>{user.id}</td>
                <td>
                  <ButtonBasic buttonName='상세' buttonSize='middle' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [userList])
  return (
    <section>
      <ul>{userItem}</ul>
    </section>
  )
}
export default UserList
