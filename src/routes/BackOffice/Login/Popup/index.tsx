import styles from './popup.module.scss'

interface IPopup {
  id: string
  pw: string
  idValue: string
  pwValue: string
}
const Popup = ({ id, pw, idValue, pwValue }: IPopup) => {
  if (id !== idValue && pw !== pwValue) {
    return <div className={styles.container}>ID 또는 PW가 다릅니다.</div>
  }
  if (id !== idValue && pw === pwValue) {
    return <div className={styles.container}>ID가 다릅니다.</div>
  }
  if (id === idValue && pw !== pwValue) {
    return <div className={styles.container}>PW가 다릅니다.</div>
  }
  return <div className={styles.container}>ID 또는 PW가 다릅니다.</div>
}

export default Popup
