// 1. Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

import { UniTag } from 'components/ui/common';
import { ImageFon } from 'components/ui/graphics';
import { SignupForm } from 'components/ui/form/SignupForm';

import styles from 'styles/module/pages/Signup.module.scss';

// 2. Component
const Signup: React.FC = () => {
    const router = useRouter();
    // Return
    return (
        <div>
            <UniTag text={'Регистрация'}/>
            <SignupForm />
            <span> У меня уже есть аккаунт! </span>
            <Link href="/signin" passHref>
                <span className={styles.toSignin}>
                    Войти
                </span>
            </Link>
            <ImageFon
                varietyStar={'signupStar'} 
            />
        </div>
    )
}

// 3. Export
export default Signup ;