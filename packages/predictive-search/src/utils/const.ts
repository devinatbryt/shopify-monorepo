export const DEFAULT_QUERY_KEY = "getSuggestions";

export const DEFAULT_FRAGMENTS: string[] = [
  `fragment ArticleFields on Article {
      id 
  }`,
  `
fragment CollectionFields on Collection {
  id 
}
`,
  `
    fragment PageFields on Page {
      id 
    }
  `,
  `
    fragment ProductFields on Product {
      id 
    }
  `,
  `
    fragment SearchQuerySuggestionFields on SearchQuerySuggestion {
      text
    }
  `,
];

export const FRAGMENT_FIELDS = {
  Article: "articles",
  Collection: "collections",
  Page: "pages",
  Product: "products",
  SearchQuerySuggestion: "queries",
};
