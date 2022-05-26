import UserSearch from './comp/UserSearch'
import UserList from './comp/UserList'

interface Props {}

const UserManagement = (props: Props) => {
  return (
    <div>
      <UserSearch />
      <UserList />
    </div>
  )
}

export default UserManagement
