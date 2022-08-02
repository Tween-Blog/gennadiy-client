// 1. Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from 'styles/module/components/Navbar.module.scss';

// 2.Types
interface INavigation {
    id: number;
    content: any;
    path: string
}

// 3. Component
const Navbar: React.FC = () => {
    // Variables
    const { pathname } = useRouter();

    const navProfile = {
        n: <div className={styles.navProfile}></div>
    }

    const navigation: INavigation[] = [
        { id: 1, content: 'Главная', path: '/'},
        { id: 2, content: 'Пользователи', path: '/usersList'},
        { id: 3, content: navProfile.n, path: '/profile'}
    ]

    // Return
    return (
        <nav className={styles.nav}>
            <Link href="/">
                 <a className={styles.logo}>
                    Tween
                </a>
            </Link>
            <ul className={styles.links}>
                {navigation.map(( {id, content, path}) => (
                    <li key={id}>
                        <Link  href={path}>
                            <a className={pathname === path ? styles.active : null}>
                                {content}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// 4. Export
export { Navbar };