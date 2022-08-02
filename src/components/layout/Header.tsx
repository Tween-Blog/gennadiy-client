// 1. Imports
import { Navbar } from '@/layout';

// 2. Component
const Header: React.FC = () => {
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