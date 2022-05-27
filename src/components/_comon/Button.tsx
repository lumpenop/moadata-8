import { MouseEvent } from 'react'
import styles from './button.module.scss'

interface Props {
  title: string
  value: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ title, value, onClick }: Props) => {
  return (
    <button className={styles.blueButton} value={value} type='button' onClick={onClick}>
      {title}
    </button>
  )
}

export default Button
