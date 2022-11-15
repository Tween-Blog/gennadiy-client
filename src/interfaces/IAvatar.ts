export interface ContentProps {
    id?: string;
    nick: string;
    description?: string;  
    isLink?: boolean; 
    editContent?: boolean; 
};

export interface EditProps {
    id: string; 
    activeNick?: boolean; 
    activeDesc?: boolean; 
    editNick?: any;
    editDescription?: string | undefined;
    modeEdit?: boolean;
};