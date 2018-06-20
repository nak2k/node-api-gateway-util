const { basename, dirname } = require('path');

function getOrCreateResource(resources, path) {
  let resource = resources.find(r => r.path === path);

  if (resource) {
    return resource;
  }

  if (path === '/') {
    const root = {
      id: genId(),
      parentId: undefined,
      pathPart: undefined,
      path,
      resourceMethods: {},
    };

    resources.push(root);
    return root;
  }

  const parent = getOrCreateResource(resources, dirname(path));

  resource = {
    id: genId(),
    parentId: parent.id,
    pathPart: basename(path),
    path,
    resourceMethods: {},
  };

  resources.push(resource);
  return resource;
}

function genId() {
  return Math.random().toString(36).substring(2, 15);
}

/*
 * Exports.
 */
exports.getOrCreateResource = getOrCreateResource;
exports.genId = genId;
