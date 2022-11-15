import Link from 'next/link';

import { UniTag } from 'components/ui/common';
import { BackImage } from '@/uiGraphics';
import SignupForm from '@/uiForm/SignupForm';

import styles from '@/pagesStyle/Signup.module.scss';

const Signup: React.FC = () => {   
    return (
        <div>
            <UniTag text={'Регистрация'} />
            <SignupForm />

            <span> У меня уже есть аккаунт! </span>
            <Link href="/signin" passHref>
                <span className={styles.toSignin}>
                    Войти
                </span>
            </Link>
            
            <BackImage variety={'signupStar'} />
        </div>
    )
};

export default Signup;