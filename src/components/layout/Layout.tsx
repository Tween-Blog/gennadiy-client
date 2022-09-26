// 1. Imports
import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hook';

import { Header, Footer } from '@/layout';
import { Loader } from '@/uiGraphics';

// 2. Types
type LayoutType = { children: ReactNode };

// 3. Component
const Layout: FC<LayoutType> = ({ children }) => {
    const router = useRouter(); 
    const { pathname } = useRouter();

    const isAuth = useAppSelector(state => state.auth.isAuth),
          isLoading = useAppSelector(state => state.loader.isLoading);

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
        
    }, [isAuth, pathname, router])
    
    const sectionName: string = pathname !== '/' ? pathname.slice(1).split('?')[0] : 'home';
    
    return (
        <div className="next-layout">
            <Header />

            <section className={'section-' + sectionName}>
                { isLoading? <Loader /> : null }

                <div className="container"> 
                    {children} 
                </div>
            </section>
            
            <Footer />
        </div>
    )
}

// 4. Export
export default Layout;