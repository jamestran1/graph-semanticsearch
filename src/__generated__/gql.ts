/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery DetailQueryDe($slug: String) {\n  FoodPage(locale: de, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n": types.DetailQueryDeDocument,
    "\nquery HomePageDe{\n  HomePage(locale: de) {\n    items {\n      Title\n      FoodArea {\n        ContentLink {\n          Expanded {\n            ...on FoodPage {\n              Name\n              Image\n              Description\n              Types\n              ContentLink {\n                Url\n              }\n          }\n        }\n      }\n    }\n  }\n  }\n}\n": types.HomePageDeDocument,
    "\n    query findFoodAI($search: String, $locale: [Locales]) {\n    FoodPage(limit: 5, locale: $locale, where: {\n        _or: [\n        {\n            Name: {\n            match: $search\n            boost: 5\n            }\n        },\n        {\n            _fulltext: {\n            match: $search \n            }\n        },\n        ]\n    }, orderBy: {\n        _ranking: SEMANTIC\n    }) {\n        items {\n        Name\n        Types\n        Image\n        ContentLink {\n            Url\n        }\n        Description\n        _score\n        }\n        facets {\n        Types {\n            name\n            count\n        }\n        }\n        total\n    }\n    }\n": types.FindFoodAiDocument,
    "\nquery DetailQuery($slug: String) {\n  FoodPage(locale: en, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n": types.DetailQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery DetailQueryDe($slug: String) {\n  FoodPage(locale: de, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n"): (typeof documents)["\nquery DetailQueryDe($slug: String) {\n  FoodPage(locale: de, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery HomePageDe{\n  HomePage(locale: de) {\n    items {\n      Title\n      FoodArea {\n        ContentLink {\n          Expanded {\n            ...on FoodPage {\n              Name\n              Image\n              Description\n              Types\n              ContentLink {\n                Url\n              }\n          }\n        }\n      }\n    }\n  }\n  }\n}\n"): (typeof documents)["\nquery HomePageDe{\n  HomePage(locale: de) {\n    items {\n      Title\n      FoodArea {\n        ContentLink {\n          Expanded {\n            ...on FoodPage {\n              Name\n              Image\n              Description\n              Types\n              ContentLink {\n                Url\n              }\n          }\n        }\n      }\n    }\n  }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query findFoodAI($search: String, $locale: [Locales]) {\n    FoodPage(limit: 5, locale: $locale, where: {\n        _or: [\n        {\n            Name: {\n            match: $search\n            boost: 5\n            }\n        },\n        {\n            _fulltext: {\n            match: $search \n            }\n        },\n        ]\n    }, orderBy: {\n        _ranking: SEMANTIC\n    }) {\n        items {\n        Name\n        Types\n        Image\n        ContentLink {\n            Url\n        }\n        Description\n        _score\n        }\n        facets {\n        Types {\n            name\n            count\n        }\n        }\n        total\n    }\n    }\n"): (typeof documents)["\n    query findFoodAI($search: String, $locale: [Locales]) {\n    FoodPage(limit: 5, locale: $locale, where: {\n        _or: [\n        {\n            Name: {\n            match: $search\n            boost: 5\n            }\n        },\n        {\n            _fulltext: {\n            match: $search \n            }\n        },\n        ]\n    }, orderBy: {\n        _ranking: SEMANTIC\n    }) {\n        items {\n        Name\n        Types\n        Image\n        ContentLink {\n            Url\n        }\n        Description\n        _score\n        }\n        facets {\n        Types {\n            name\n            count\n        }\n        }\n        total\n    }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery DetailQuery($slug: String) {\n  FoodPage(locale: en, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n"): (typeof documents)["\nquery DetailQuery($slug: String) {\n  FoodPage(locale: en, where: {\n    ContentLink: {\n      Url: {\n        endsWith: $slug\n      }\n    }\n  }) {\n    items {\n      Name\n      Types\n      Image\n      ContentLink {\n        Url\n      }\n      Description\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;