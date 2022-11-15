import Link from 'next/link';
import { FC , ReactNode } from 'react';
import { useRouter } from 'next/router';

import AuthService from '@/services/AuthServices';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/store/slices/authSlice';
import { loader } from '@/store/slices/loaderSlice';

import { INavigation } from 'interfaces/IUi';
import styles from '../../styles/module/components/Navbar.module.scss';

const Navbar: FC = () => {
    const { pathname } = useRouter();
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const navProfile: ReactNode = <div className={styles.navProfile}></div>
    const navigation: INavigation[] = [
        { id: 1, content: 'Главная', path: '/' },
        { id: 2, content: 'Пользователи', path: '/users' },
        { id: 3, content: navProfile, path: '/profile' },
    ];

    const handleLogout = async () => {  
        try {
            dispatch(loader());
            await AuthService.logout();  
            localStorage.removeItem('accessToken'); 
            dispatch(logout());  
        } catch (e) {
            console.error(e.response.data);
        }  finally {
            dispatch(loader()); 
        }  
    };
     
    return (
        <nav className={styles.nav}>
            <Link href="/">
                 <a className={styles.logo}>
                    Tween
                </a>
            </Link>
            <ul className={styles.links}>
                {navigation.map(( {id, content, path} ) => (
                    
                    <li key={id} className={styles.link} >
                        <Link  href={path}>
                            <a className={
                                pathname === path? styles.active :
                                !isAuth && content === 'Главная'? styles.active : null
                            }>
                                {content}
                            </a>
                        </Link>
                    </li>
                ))}

                    <li className={styles.link}>
                        <div 
                            className={isAuth ? styles.navLogout : null}
                            onClick={() => handleLogout()} 
                        />
                    </li>   
            </ul>   
        </nav>
    )
};

export { Navbar };