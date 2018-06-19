const test = require('tape');
const {
  getOrCreateResource,
  getPathParameter,
  matchBy,
} = require('..');

test('test getPathParameter', t => {
  t.plan(4);

  const resources = [];

  const resourceC = getOrCreateResource(resources, '/a/b/c');

  t.equal(resourceC.pathPart, 'c');
  t.equal(resources.length, 4);

  const resourceB = getOrCreateResource(resources, '/a/b');

  t.equal(resourceB.pathPart, 'b');
  t.equal(resources.length, 4);
});

test('test getPathParameter', t => {
  t.plan(8);

  {
    const result = getPathParameter({
      pathPart: '',
    });

    t.equal(result.name, false);
    t.equal(result.greedy, false);
  }

  {
    const result = getPathParameter({
      pathPart: 'test',
    });

    t.equal(result.name, false);
    t.equal(result.greedy, false);
  }

  {
    const result = getPathParameter({
      pathPart: '{test}',
    });

    t.equal(result.name, 'test');
    t.equal(result.greedy, false);
  }

  {
    const result = getPathParameter({
      pathPart: '{test+}',
    });

    t.equal(result.name, 'test');
    t.equal(result.greedy, true);
  }
});

test('test matchBy', t => {
  t.plan(2);

  const resources = [
    {
      id: "1",
      path: "/",
    },
  ];

  {
    const [err, result] = matchBy(resources, { path: '/xxx' });

    t.error(err);
    t.equal(result, null);
  }
});

test('test matchBy with callback', t => {
  t.plan(2);

  const resources = [
    {
      id: "1",
      path: "/",
    },
  ];

  matchBy(resources, { path: '/xxx' }, (err, result) => {
    t.error(err);
    t.equal(result, null);
  });
});

test('test matchBy with method', t => {
  t.plan(15);

  const resources = [
    {
      id: "1",
      path: "/",
      resourceMethods: {
        GET: {
          methodIntegration: {
          },
        },
      },
    },
    {
      id: "2",
      path: "/greedy",
      parentId: '1',
      pathPart: 'greedy',
      resourceMethods: {
        GET: {
          methodIntegration: {
          },
        },
      },
    },
    {
      id: "3",
      path: "/greedy/signin",
      parentId: '2',
      pathPart: "signin",
      resourceMethods: {
        POST: {
          methodIntegration: {
          },
        },
      },
    },
    {
      id: "4",
      path: "/greedy/{param+}",
      parentId: '2',
      pathPart: "{param+}",
      resourceMethods: {
        ANY: {
          methodIntegration: {
          },
        },
      },
    },
  ];

  matchBy(resources, { path: '/xxx', method: 'GET' }, (err, result) => {
    t.error(err);
    t.equal(result, null);
  });

  matchBy(resources, { path: '/', method: 'GET' }, (err, result) => {
    t.error(err);
    t.ok(result);
    t.ok(result.resourceMethod);
    t.ok(result.resourceMethod.methodIntegration);
  });

  matchBy(resources, { path: '/greedy/signin', method: 'POST' }, (err, result) => {
    t.error(err);
    t.ok(result);
    t.equal(result.resource.id, "3");
  });

  matchBy(resources, { path: '/greedy/signin', method: 'GET' }, (err, result) => {
    t.error(err);
    t.ok(result);
    t.equal(result.resource.id, "4");
  });

  matchBy(resources, { path: '/greedy/', method: 'GET' }, (err, result) => {
    t.error(err);
    t.ok(result);
    t.equal(result.resource.id, "4");
  });
});
