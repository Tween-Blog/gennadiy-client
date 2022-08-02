// 1. Imports

//2. Types
type UniTagProps = {
    tag?: any;
    text: string;
};

// 3. Component
const UniTag: React.FC<UniTagProps> = ( {tag = 'h1', text} ) => { 
    const Tag = tag;
    return <Tag>{text}</Tag>
};
  
// 4. Export
export { UniTag };