import styles from './popup.module.scss'

interface IPopup {
  id: string
  pw: string
}
const Popup = ({ id, pw }: IPopup) => {
  localStorage.setItem('id', id)
  localStorage.setItem('pw', pw)
  return <div className={styles.container}>ID 또는 PW가 다릅니다.</div>
}

export default Popup
