import { MutableRefObject, useEffect } from 'react';
import { useLatest } from '@/helpers/hookAvatar/useLatest';

export const useOutsideClick = (
  elementRef:MutableRefObject<any>,    
  modeEditRef:MutableRefObject<any>,
  stateSwitch:boolean,
  reset:Function,
) => {
  const latestReset = useLatest(reset);
  useEffect (() => {    
    const handleClick = (e: { target: any; }) => {
        const modeEdit:any = modeEditRef.current.contains(e.target);                
        const typeEdit:string = modeEditRef.current.dataset.type;
        const click:boolean = elementRef.current.contains(e.target);

        // When editing or active switch          
        if (!elementRef.current || modeEdit || !stateSwitch) return;
        // Overwriting the name or description when clicking on the default             
        if (!click && typeEdit == 'typeNick')  {  
            latestReset.current(typeEdit);                 
        } else if (!click && typeEdit == 'typeDesc') {
            latestReset.current(typeEdit);    
        }
    }
 
    document.addEventListener('click', handleClick);
    return () => {
        document.removeEventListener('click', handleClick);
    }
  }, [elementRef, modeEditRef, stateSwitch, reset , latestReset]) 
};