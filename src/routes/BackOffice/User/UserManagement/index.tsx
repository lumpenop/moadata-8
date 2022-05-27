import { useState } from 'react'
import { useRecoil } from 'hooks/state'
import { userListState } from 'store/userManagement'
import UserList from './comp/UserList'
import UserSearch from './comp/UserSearch'
import { IUser } from 'types/userManagement'

interface Props {}

const UserManagement = (props: Props) => {
  const [userList, setUserList] = useRecoil<IUser[]>(userListState)
  const [isListHidden, setIsListHidden] = useState(false)

  return (
    <div>
      <UserSearch setIsListHidden={setIsListHidden} />
      <UserList isListHidden={isListHidden} />
    </div>
  )
}

export default UserManagement
