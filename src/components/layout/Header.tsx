import { FC } from 'react';
import { Navbar } from '@/layout';

// 2. Component
const Header: FC = () => {
    return (
        <header>
            <div className="container">
                <Navbar />
            </div>
      </header>
    )
}

// 3. Export
export { Header };