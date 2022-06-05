import { cx } from 'styles'
import styles from './popup.module.scss'

interface IPopup {
  popupMessage?: string
  showPopup: boolean
}

const Popup = ({ popupMessage, showPopup }: IPopup) => {
  return (
    <div
      className={cx(styles.container, { [styles.fadein]: showPopup === true, [styles.fadeout]: showPopup === false })}
    >
      {popupMessage}
    </div>
  )
}

export default Popup
