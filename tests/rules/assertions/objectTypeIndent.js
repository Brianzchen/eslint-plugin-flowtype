export default {
  invalid: [
    // not enough spaces
    {
      code: 'type obj = {\n baz: { "foo": "qux" },\n  bar: 4\n}',
      errors: [
        {message: 'Object type expected indentation of 2 spaces'},
        {message: 'Object type expected indentation of 2 spaces'},
      ],
      options: [{indent: 2}],
    },

    // too many spaces
    {
      code: 'type obj = {\n   baz: { "foo": "qux" },\n  bar: 4\n}',
      errors: [
        {message: 'Object type expected indentation of 2 spaces'},
        {message: 'Object type expected indentation of 2 spaces'},
      ],
      options: [{indent: 2}],
    },
  ],
  valid: [
    {
      code: 'type obj = {\n  baz: { "foo": "qux" },\n  bar: 4\n}',
    },
    {
      code: 'type obj = {\n    baz: { "foo": "qux" },\n    bar: 4\n}',
      options: [{indent: 4}],
    },
    {
      code: 'type obj = { baz: { "foo": "qux" }, bar: 4}',
      options: [{indent: 2}],
    },
  ],
};
