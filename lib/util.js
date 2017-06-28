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

/*
 * Find a resource by pathPart from same level resources. 
 */
const findByPathPart = (resources, pathPart) => {
  let found = null;

  for (let i = 0; i < resources.length; i++) {
    let resource = resources[i];

    if (resource.pathPart === pathPart) {
      return resource;
    }

    if (isPathParam(resource)) {
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

exports.findByPathPart = findByPathPart;
exports.isChild = isChild;
exports.isRoot = isRoot;
exports.isPathParam = isPathParam;
exports.getPathParameter = getPathParameter;