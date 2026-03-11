import { createSwaggerSpec } from 'next-swagger-doc';

export function getApiDocs() {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Logic Matrix - API',
                version: '1.0.0',
                description:
                    '',
                contact: {
                    name: 'Logic Matrix',
                },
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: '',
                },
            ],
            tags: [
                { name: 'Services', description: 'Agency services' },
                { name: 'Projects', description: 'Portfolio projects' },
                { name: 'Technologies', description: 'Technology tags' },
                { name: 'Blog Posts', description: 'Blog posts' },
                { name: 'Blog Categories', description: 'Blog categories' },
                { name: 'Blog Tags', description: 'Blog tags' },
            ],
            components: {
                securitySchemes: {
                    sessionAuth: {
                        type: 'apiKey',
                        in: 'cookie',
                        name: 'next-auth.session-token',
                        description: 'NextAuth session cookie',
                    },
                },
            },
        },
    });

    return spec;
}
