const { matchByPath } = require('./matchByPath');

const matchByReq = (resources, req, callback = Array) => {
  const [err, result] = matchByPath(resources, req.path);

  if (err) {
    return callback(err, null);
  }

  if (!result) {
    return callback(null, null);
  }

  const { resource } = result;
  if (!resource) {
    return callback(null, null);
  }

  const { resourceMethods } = resource;
  if (!resourceMethods) {
    return callback(null, null);
  }

  const resourceMethod = resourceMethods[req.method] || resourceMethods['ANY'];
  if (!resourceMethod) {
    return callback(null, null);
  }

  result.resourceMethod = resourceMethod;

  return callback(null, result);
}

exports.matchByReq = matchByReq;
