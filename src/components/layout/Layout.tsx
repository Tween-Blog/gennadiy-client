// 1. Imports
import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'core/hook';

import { Header, Footer } from '@/layout';
import { Loader } from '@/uiGraphics';

// 2. Types
type LayoutType = { children: ReactNode };

// 3. Component
const Layout: FC<LayoutType> = ({ children }) => {
    const router = useRouter(); 
    const isLoading = useAppSelector(state => state.loader.isLoading);
    // console.log(isLoading);
    
    const sectionName: string = router.asPath !== '/' ? router.asPath.slice(1).split('?')[0] : 'home';
    
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