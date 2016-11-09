const {RuleTester} = require('eslint')

const tester = new RuleTester()

tester.run('property-get-set-key-camel-case',
  require('../../../lib/rules/property-get-set-key-camel-case'),
  {
    valid: [
      'var test = {get foo() {return 1;}};',
      'var test = {get "Foo"() {return 1;}};',
      'var test = {set foo(bar) {}};',
      'var test = {set "Foo"(bar) {}};'
    ],
    invalid: [
      {
        code: 'var test = {get Foo() {return 1;}};',
        errors: [
          {
            message: 'Non camel-cased get is prohibited',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {get "foo"() {return 1}};',
        errors: [
          {
            message: 'Camel-cased get with quote is prohibited',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {set Foo(bar) {}};',
        errors: [
          {
            message: 'Non camel-cased set is prohibited',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {set "foo"(bar) {}};',
        errors: [
          {
            message: 'Camel-cased set with quote is prohibited',
            type: 'Property'
          }
        ]
      }
    ]
  }
)