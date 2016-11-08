const {RuleTester} = require('eslint')

const tester = new RuleTester()

tester.run('object-property-key-camel-case',
  require('../../../lib/rules/object-property-key-camel-case'),
  {
    valid: [
      'var test = {foo: 1};',
      'var test = {"foo_bar": 1}',
      'var test = {"Foo": 1}',
      'test[foo];',
      'test["foo_bar"];',
      'test["Foo"]',
      'test.foo;'
    ],
    invalid: [
      {
        code: 'var test = {"foo": 1};',
        errors: [
          {
            message: 'Camel-cased property should not be quoted',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {foo_bar: 1};',
        errors: [
          {
            message: 'Non camel-cased property should be quoted',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {Foo: 1};',
        errors: [
          {
            message: 'Non camel-cased property should be quoted',
            type: 'Property'
          }
        ]
      },
      {
        code: 'test["foo"];',
        errors: [
          {
            message: 'Camel-cased property should not be quoted',
            type: 'MemberExpression'
          }
        ]
      },
      {
        code: 'test.foo_bar;',
        errors: [
          {
            message: 'Non camel-cased property should be quoted',
            type: 'MemberExpression'
          }
        ]
      },
      {
        code: 'test.Foo;',
        errors: [
          {
            message: 'Non camel-cased property should be quoted',
            type: 'MemberExpression'
          }
        ]
      }
    ]
  }
)