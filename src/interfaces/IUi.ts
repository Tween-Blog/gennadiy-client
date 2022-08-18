import { HTMLAttributes, ReactNode } from 'react';


export interface INavigation {
    id: number;
    content: string | ReactNode;
    path?: string;
}

export interface IFieldProps 
    extends React.ComponentPropsWithoutRef<'input'> {
        variety?: string;
        otherClass?: string;
    };

export interface IButton
    extends HTMLAttributes<HTMLButtonElement> {
      text: string;
      type: 'submit' | 'button' | 'reset' ;
      otherClass?: string;
  }

export  interface IBackImage {
    variety?: string;
    path?: string;
}  