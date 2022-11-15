import { HTMLAttributes, FC } from 'react';

export interface UniTagProps
    extends HTMLAttributes<HTMLElement> {
        tag?: string;
        text?: string;
        otherClass?: string;
    };

const UniTag: FC<UniTagProps> = ( {tag = 'h1', text, ...otherClass } ) => {
    const Tag = tag;
    return (
        <Tag {...otherClass} >
            {text}
        </Tag>
    )
};
  
export { UniTag };