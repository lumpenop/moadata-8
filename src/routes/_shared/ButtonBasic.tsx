import cx from 'classnames'
import styles from './ButtonBasic.module.scss'
import { MouseEventHandler } from 'react'

interface Props {
  buttonName: string
  buttonSize: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
const ButtonBasic = ({ buttonName, buttonSize, onClick }: Props) => {
  const SIZES = {
    large: styles.largeButton,
    middle: styles.middleButton,
    small: styles.smallButton,
  }[buttonSize]

  return (
    <button type='button' onClick={onClick} className={cx(styles.basicButton, SIZES)}>
      {buttonName}
    </button>
  )
}

export default ButtonBasic
