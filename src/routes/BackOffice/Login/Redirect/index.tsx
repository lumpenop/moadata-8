import { useNavigate } from 'react-router-dom'

const Redirect = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div>
      <h3>로그인이 필요합니다.</h3>
      <button type='button' onClick={handleClick}>
        Go To Login
      </button>
    </div>
  )
}
export default Redirect
