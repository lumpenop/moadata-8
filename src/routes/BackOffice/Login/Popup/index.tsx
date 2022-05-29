import { cx } from 'styles'
import styles from './popup.module.scss'

interface IPopup {
  id?: string
  pw?: string
  idValue: string
  pwValue: string
}
const Popup = ({ id, pw, idValue, pwValue }: IPopup) => {
  if (idValue === '' && idValue === '') {
    return <div className={cx(styles.container, styles.fadeout)} />
  }
  if (id !== idValue && pw !== pwValue) {
    return <div className={cx(styles.container, styles.fadein)}>ID 와 PW가 다릅니다.</div>
  }

  if (id !== idValue && pw === pwValue) {
    return <div className={cx(styles.container, styles.fadein)}>ID가 다릅니다.</div>
  }
  if (id === idValue && pw !== pwValue) {
    return <div className={cx(styles.container, styles.fadein)}>PW가 다릅니다.</div>
  }
  return <div className={cx(styles.container, styles.fadein)}>일치!</div>
}

export default Popup
