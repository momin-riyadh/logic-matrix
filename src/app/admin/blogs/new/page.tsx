import { BlogForm } from './../components/BlogForm';

export const metadata = { title: 'New Blog Post | Admin' };

export default function NewBlogPage() {
    return <BlogForm mode='create' />;
}
