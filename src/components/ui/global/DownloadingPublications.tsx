// 1. Imports
import { FC } from 'react';

import { MainButton } from '@/uiCommon';

import style from '@/componentsStyle/profileStyles/DownloadingPublications.module.scss';

// 2. Type
type PublicationsProps = {
    user?: object;
};

// 3. Component
const DownloadingPublications:FC <PublicationsProps>= ({ 
    user, 
}) => {
    // const post:number = user['postsCount'];


// Return         
    return (
        <div>
            <div className={style.panel}>
                <div>1</div>
                <div>2</div>
            </div>

            <div>
                <MainButton
                    type="submit"
                    text={'Опубликовать'}
                    otherClass="profileBtn profileBtn_right"
                    // onClick={() => handleSubmit()}
                /> 
            </div>

        </div>
    )
}

// 4. Export
export { DownloadingPublications };