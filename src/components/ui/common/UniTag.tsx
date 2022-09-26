// 1. Imports
import { HTMLAttributes, FC } from 'react'

//2. Types

export interface UniTagProps
    extends HTMLAttributes<HTMLButtonElement> {
        Tag?: any;
        text?: string;
        otherClass?: string;
  }

// 3. Component
const UniTag: FC<UniTagProps> = ( {Tag = 'h1', text, ...otherClass } ) => {
    return (
        <Tag {...otherClass} >

            {text}

        </Tag>
    )

}
  
// 4. Export
export { UniTag };