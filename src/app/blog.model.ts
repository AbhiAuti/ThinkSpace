export interface Blog {
    id?: string;              // Optional ID (used when editing or fetching existing blogs)
    title: string;            // Blog title
    description: string;      // Blog description or body
    image?: string;    // Can be a File (before upload) or string (URL after upload)
    createdAt?: string;       // Timestamp for creation
    updatedAt?: string;       // Optional update timestam
    authorId?:string;
    authorName:string;        //for credits
    authorEmail: string     //for giving feedback
}
