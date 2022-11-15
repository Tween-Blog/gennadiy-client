import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hook';

import { Header, Footer } from '@/layout';
import { Loader } from '@/uiGraphics';

type LayoutType = { children: ReactNode };

const Layout: FC<LayoutType> = ({ children }) => {
    const router = useRouter(),
         { pathname } = useRouter();

    const isAuth = useAppSelector(state => state.auth.isAuth);
    
    const sectionName: string = pathname !== '/' ? pathname.slice(1).split('?')[0] : 'home';

    useEffect(()  => {
        if (pathname == '/404') {
            setTimeout(() => {
                router.push('/')
            }, 5000)
        } else {
            !isAuth && pathname !== '/'
            && pathname !== '/signin'
            && pathname !== '/signup' ? router.push('/') : null
        }    
    }, [isAuth, pathname, router]);
        
    return (
        <div className="next-layout">
            <Loader />
            <Header />  
            <section className={'section-' + sectionName}>   
                <div className="container"> 
                    {children} 
                </div>
            </section>
            <Footer />
        </div>
    )
};

export default Layout;