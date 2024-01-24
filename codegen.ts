import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://cg.optimizely.com/content/v2?auth=FN2KsYsUIKkqahBfJOiILcRUykgXoY0VFomMgVHjM1IMiSyg',
    documents: './src/**/*.tsx',
    generates: {
        "./src/__generated__/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
            }
        }
    },
};

export default config;