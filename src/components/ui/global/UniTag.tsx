// 1. Imports
import { FC } from 'react'

//2. Types
type UniTagProps = {
    Tag?: any;
    text: string;
};

// 3. Component
const UniTag: FC<UniTagProps> = ( {Tag = 'h1', text} ) => <Tag>{text}</Tag>
  
// 4. Export
export { UniTag };