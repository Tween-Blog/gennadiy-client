// 1. Imports
import { FC } from 'react';

type AvatarProps = {
    nick?: string;
};

// 2. Component
const Avatar:FC <AvatarProps>= ({ nick }) => {
    return (
        <div>
            {nick}
        </div>
    )
}

// 3. Export
export { Avatar };