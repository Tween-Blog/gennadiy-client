import { FC } from 'react';
import { Navbar } from '@/layout';

const Header: FC = () => {
    return (
        <header>
            <div className="container">
                <Navbar />
            </div>
      </header>
    )
};

export { Header };