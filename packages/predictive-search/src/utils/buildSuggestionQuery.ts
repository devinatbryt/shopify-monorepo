import type { FragmentDetails } from "./types";

import { FRAGMENT_FIELDS } from "./const";
import isFragmentType from "./isFragmentType";

const buildSuggestionQuery = (fragmentsArray: string[] = []): string => {
  const fragmentRegex = new RegExp(
    `fragment ([a-zA-Z]+) on (${Object.keys(FRAGMENT_FIELDS).join("|")})`,
    "gm"
  );

  const fragmentDetails = fragmentsArray.reduce(
    (fragmentDetails: FragmentDetails, fragmentDefinition) => {
      const matches = fragmentDefinition.matchAll(fragmentRegex);
      for (const match of matches) {
        if (!match[1]) return fragmentDetails;
        if (!match[2]) return fragmentDetails;
        const [_, fragmentName, fragmentType] = match;
        if (!isFragmentType(fragmentType)) return fragmentDetails;
        if (fragmentDetails[fragmentType]) {
          console.warn(
            `Fragment ${fragmentName} already exists on ${fragmentType}`
          );
        }
        fragmentDetails[fragmentType] = {
          name: fragmentName,
          field: FRAGMENT_FIELDS[fragmentType],
          type: fragmentType,
        };
      }
      return fragmentDetails;
    },
    {}
  );

  return `
    query suggestions($query: String!, $limit: Int, $scope: PredictiveSearchLimitScope, $searchableFields: [SearchableField!], $types: [PredictiveSearchType!], $unavailableProducts: SearchUnavailableProductsType) {
      predictiveSearch(query: $query, limit: $limit, limitScope: $scope, searchableFields: $searchableFields, types: $types, unavailableProducts: $unavailableProducts) {
        ${Object.keys(fragmentDetails)
          .map(
            (type) => `
      ${fragmentDetails[type].field} {
            ...${fragmentDetails[type].name}
          }  
        `
          )
          .join("\n")} 
      }
    }
    ${fragmentsArray.join("\n")}
  `;
};

export default buildSuggestionQuery;
