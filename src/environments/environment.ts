// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  'uri': {
    'odata': 'http://gbldncommoniisdev1.anyaccess.net:82/OilHubOData',
    'entitlements': 'http://gbldncommoniisdev1.anyaccess.net:82/entitlements',
    'rest': 'http://gbldncommoniisdev1.anyaccess.net:82/OilHubRest',
    'calendar': 'http://gbldncommoniisdev1.anyaccess.net:82/PLCalendar',
    'testApi': 'http://gbldnwksp10072:7070/api',
    'gmexApi': 'http://gbldncommoniisdev1a:82/Spirata',
    'query': 'http://localhost:1025/api/query',
    'socketUrl': 'http://localhost:7979'
  },
};
