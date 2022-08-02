// 1. Imports
import styles from 'styles/module/components/MainButton.module.scss'

// 2. Types
interface IBtn
  extends React.HTMLAttributes<HTMLButtonElement> {
  text: string,
}

// 3. Component
const MainButton: React.FC<IBtn> = ( { text , ...other } ) => {
    return (
        <button 
            className={styles.mainButton}
            {...other}
        >
            {text}
        </button>
    )
}

// 4. Export
export { MainButton };