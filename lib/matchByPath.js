const {
  findByPathPart,
  isChild,
  isRoot,
  getPathParameter,
} = require('./util');

const matchByPath = (resources, path, callback = Array) => {
  let resource = resources.find(isRoot);

  if (!resource) {
    return callback(new Error('Root resource not found'), null);
  }

  const pathParameters = {};

  if (path === '/') {
    return callback(null, {
      resource,
      pathParameters,
    });
  }

  if (path.startsWith('/')) {
    path = path.substr(1);
  }

  const parts = path.split('/');

  while (parts.length) {
    const children = resources.filter(isChild(resource.id));

    if (children.length === 0) {
      /*
       * Not matched.
       */
      return callback(null, null);
    }

    const part = parts.shift();

    resource = findByPathPart(children, part);

    if (!resource) {
      /*
       * Not matched.
       */
      return callback(null, null);
    }

    const { name, greedy } = getPathParameter(resource);

    if (name) {
      if (greedy) {
        parts.unshift(part);
        pathParameters[name] = parts;
        break;
      } else {
        pathParameters[name] = part;
      }
    }
  }

  return callback(null, {
    resource,
    pathParameters,
  });
};

exports.matchByPath = matchByPath;
