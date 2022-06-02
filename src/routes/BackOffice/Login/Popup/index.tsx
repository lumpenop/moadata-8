import { cx } from 'styles'
import styles from './popup.module.scss'

interface IPopup {
  popupMessage?: string
}

const Popup = ({ popupMessage }: IPopup) => {
  return <div className={cx(styles.container, styles.fadein)}>{popupMessage}</div>
}

export default Popup
