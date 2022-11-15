export interface IPost {
    error?: any;
    date: string,
    description: string,
    id: string,
    likesCount: number,
    picture: string,
    title: string,
    userId: string
};

export interface IPostProps {
    post: IPost,
 };

 export interface IDeletePost {
    _id: string;
}

export interface ICommentProps {
    post: IPost,
    isLike?: boolean,
};

export interface IComment {
    id: string,
    postId: string,
    text: string,
    userId: string,
};

export interface ILike {
    date: string,
    like: number,
    postId: string,
    userId: string,
};