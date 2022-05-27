import { useState } from 'react'
import UserList from './comp/UserList'
import UserSearch from './comp/UserSearch'

const UserManagement = () => {
  const [isListHidden, setIsListHidden] = useState(false)

  return (
    <div>
      <UserSearch setIsListHidden={setIsListHidden} />
      <UserList isListHidden={isListHidden} />
    </div>
  )
}

export default UserManagement
