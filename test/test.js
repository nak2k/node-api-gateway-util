const test = require('tape');
const {
  getPathParameter,
  matchByPath,
  matchByReq,
} = require('..');

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

test('test matchByPath', t => {
  t.plan(2);

  const resources = [
    {
      id: "1",
      path: "/",
    },
  ];

  {
    const [err, result] = matchByPath(resources, '/xxx');

    t.error(err);
    t.equal(result, null);
  }
});

test('test matchByPath with callback', t => {
  t.plan(2);

  const resources = [
    {
      id: "1",
      path: "/",
    },
  ];

  matchByPath(resources, '/xxx', (err, result) => {
    t.error(err);
    t.equal(result, null);
  });
});

test('test matchByReq', t => {
  t.plan(6);

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
  ];

  matchByReq(resources, { path: '/xxx', method: 'GET' }, (err, result) => {
    t.error(err);
    t.equal(result, null);
  });

  matchByReq(resources, { path: '/', method: 'GET' }, (err, result) => {
    t.error(err);
    t.ok(result);
    t.ok(result.resourceMethod);
    t.ok(result.resourceMethod.methodIntegration);
  });
});
