const test = require('tape');
const {
  getPathParameter,
  matchByPath,
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
