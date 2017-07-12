const isChild = parentId =>
  resource => resource.parentId === parentId;

const isRoot = resource => resource.parentId === undefined;

const isPathParam = resource => {
  const { pathPart } = resource;

  if (pathPart === undefined) {
    return false;
  }

  return pathPart.startsWith('{') && pathPart.endsWith('}');
};

const hasMethod = (resource, method) => {
  const { resourceMethods } = resource;

  return resourceMethods && (resourceMethods[method] || resourceMethods.ANY);
};

/*
 * Find a resource from same level resources. 
 */
const findBy = (resources, options) => {
  const {
    pathPart,
    method,
  } = options;

  let found = null;

  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];

    if (resource.pathPart === pathPart && (!method || hasMethod(resource, method))) {
      return resource;
    }

    if (isPathParam(resource) && (!method || hasMethod(resource, method))) {
      found = resource;
    }
  }

  return found;
};

const getPathParameter = resource => {
  if (!isPathParam(resource)) {
    return {
      name: false,
      greedy: false,
    };
  }

  const { pathPart } = resource;
  let name = pathPart.substr(1, pathPart.length - 2);
  const greedy = name.endsWith('+');

  return {
    name: greedy ? name.substr(0, name.length - 1) : name,
    greedy,
  };
};

exports.findBy = findBy;
exports.isChild = isChild;
exports.isRoot = isRoot;
exports.isPathParam = isPathParam;
exports.getPathParameter = getPathParameter;
