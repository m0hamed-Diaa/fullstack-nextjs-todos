export interface ITodo {
    title: string;
    body: string | null;
    completed: boolean;
    id: string;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    created_at: string;
    email_addresses: { email_address: string }[];
    profile_image_url: string;
}