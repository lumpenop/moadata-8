import { Outlet } from 'react-router-dom'

interface Props {}
const LNB = (props: Props) => {
  return (
    <div>
      LNB
      <Outlet />
    </div>
  )
}

export default LNB
