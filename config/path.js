var build = __dirname+'/../build'
  , api = build+'/app/api'
  , front = build+'/app/front';

module.exports = {
  build: build,
  utils: build + '/utils',
  api: api,
  services: api+'/services',
  models: api+'/models',
  apiRoutes: api+'/routes',
  forms: api+'/forms',
  front: front,
  public: build+'/public'
};
