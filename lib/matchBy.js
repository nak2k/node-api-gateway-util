const {
  findBy,
  isChild,
  isRoot,
  getPathParameter,
} = require('./util');

const matchBy = (resources, options, callback = Array) => {
  let {
    path,
    method,
  } = options;

  let resource = resources.find(isRoot);

  if (!resource) {
    return callback(new Error('Root resource not found'), null);
  }

  const pathParameters = {};

  if (path !== '/') {
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

      resource = findBy(children, {
        pathPart: part,
        method: parts.length ? undefined : method,
      });

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
  }

  if (method === undefined) {
    return callback(null, {
      resource,
      pathParameters,
    });
  } else {
    const { resourceMethods } = resource;

    if (!resourceMethods) {
      return callback(null, null);
    }

    return callback(null, {
      resource,
      pathParameters,
      resourceMethod: resourceMethods[method] || resourceMethods.ANY,
    });
  }
};

exports.matchBy = matchBy;
