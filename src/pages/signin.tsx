// 1. Imports
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { UniTag } from 'components/ui/common';
import { BackImage } from 'components/ui/graphics';
import SigninForm from 'components/ui/form/SigninForm';

import styles from 'styles/module/pages/Signin.module.scss';

// 2. Component
const Signin: FC = () => {
    const router = useRouter();
    // Return
    return (
        <div>
            <div className={styles.frameSignin}>
                <UniTag Tag = {'h2'} text={'Авторизация'}/>
                <SigninForm />
                <Link href="/signup" passHref>
                    <span className={styles.toSignup}>
                        Я еще не зарегестрирован
                    </span>
                </Link>
            </div>
            
            <BackImage
                    variety={'signinStar'} 
                />
            <BackImage
                path={'gear.svg'}
                variety={'signinGear'} 
            />
        </div>
    )
}

// 3. Export
export default Signin ;