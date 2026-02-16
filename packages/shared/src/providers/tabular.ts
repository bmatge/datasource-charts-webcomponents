import type { ProviderConfig } from './provider-config.js';

const TABULAR_RE = /tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/;

export const TABULAR_CONFIG: ProviderConfig = {
  id: 'tabular',
  displayName: 'Tabular (data.gouv.fr)',
  urlPatterns: [TABULAR_RE],
  knownHosts: [
    { hostname: 'tabular-api.data.gouv.fr', proxyEndpoint: '/tabular-proxy' },
  ],
  defaultBaseUrl: 'https://tabular-api.data.gouv.fr',
  defaultAuthType: 'none',

  response: {
    dataPath: 'data',
    totalCountPath: 'meta.total',
    nestedDataKey: null,
    requiresFlatten: false,
  },

  pagination: {
    type: 'page',
    pageSize: 100,
    maxPages: 500,
    maxRecords: 50000,
    params: { page: 'page', pageSize: 'page_size' },
    nextPagePath: 'next',
    serverMeta: {
      pagePath: 'meta.page',
      pageSizePath: 'meta.page_size',
      totalPath: 'meta.total',
    },
  },

  capabilities: {
    serverFetch: true,
    serverFacets: false,
    serverSearch: false,
    serverGroupBy: false,
    serverOrderBy: true,
    serverAggregation: false,
  },

  query: {
    whereFormat: 'colon',
    whereSeparator: ', ',
    aggregationSyntax: 'colon-attr',
    searchTemplate: null,
    operatorMapping: {
      eq: 'exact', neq: 'differs', gt: 'strictly_greater', gte: 'greater',
      lt: 'strictly_less', lte: 'less', contains: 'contains', notcontains: 'notcontains',
      in: 'in', notin: 'notin', isnull: 'isnull', isnotnull: 'isnotnull',
    },
  },

  facets: {
    defaultMode: 'static',
  },

  resource: {
    idFields: ['resourceId'],
    apiPathTemplate: '/api/resources/{resourceId}/data/',
    extractIds: (url: string) => {
      const m = url.match(TABULAR_RE);
      return m ? { resourceId: m[1] } : null;
    },
  },

  codeGen: {
    usesGouvSource: false,
    usesGouvQuery: true,
    usesGouvNormalize: false,
    queryApiType: 'tabular',
    fieldPrefix: '',
    dependencies: { dsfr: true, dsfrChart: true, gouvWidgets: true },
    v2: { usesGouvSource: true, usesGouvQuery: true, sourceApiType: 'tabular' },
  },
};
