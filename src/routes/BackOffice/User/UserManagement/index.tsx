import UserSearch from './comp/UserSearch'
import UserList from './comp/UserList'

import USER_LIST from 'data/user_list.json'

import { useState } from 'react'

interface Props {}

interface IUser {
  seq: number
  member_seq: string
  date: string
  id: string
}

const UserManagement = (props: Props) => {
  const [userList, setUserList] = useState<IUser[]>(USER_LIST)
  const [isListHidden, setIsListHidden] = useState(false)

  return (
    <div>
      <UserSearch setUserList={setUserList} userList={userList} setIsListHidden={setIsListHidden} />
      <UserList userList={userList} isListHidden={isListHidden} />
    </div>
  )
}

export default UserManagement
