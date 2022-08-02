// 1. Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

import { UniTag } from 'components/ui/common';
import { ImageFon } from 'components/ui/graphics';
import { SigninForm } from 'components/ui/form/SigninForm';

import styles from 'styles/module/pages/Signin.module.scss';

// 2. Component
const Signin: React.FC = () => {
    const router = useRouter();
    // Return
    return (
        <div>
            <div className={styles.frameSignin}>
                <UniTag tag = {'h2'} text={'Авторизация'}/>
                <SigninForm />
                <Link href="/signup" passHref>
                    <span className={styles.toSignup}>
                        Я еще не зарегестрирован
                    </span>
                </Link>
            </div>
            <ImageFon
                    varietyStar={'signinStar'} 
                />
            <ImageFon
                srcImage={'gear.svg'}
                varietyStar={'signinGear'} 
            />
        </div>
    )
}

// 3. Export
export default Signin ;