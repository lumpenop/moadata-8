import { cx } from 'styles'
import styles from './popup.module.scss'

interface IPopup {
  popUpMessage?: string
}
const Popup = ({ popUpMessage }: IPopup) => {
  return <div className={cx(styles.container, styles.fadein)}>{popUpMessage}</div>
}

export default Popup
