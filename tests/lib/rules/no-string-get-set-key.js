const {RuleTester} = require('eslint')

const tester = new RuleTester()

tester.run('no-string-get-set-key',
  require('../../../lib/rules/no-string-get-set-key'),
  {
    valid: [
      'var test = {get foo() {return 1;}};',
      'var test = {set foo(bar) {}};',
      'var test = {get Foo() {return 1;}};',
      'var test = {set Foo(bar) {}};',
    ],
    invalid: [
      {
        code: 'var test = {get "foo"() {return 1}};',
        errors: [
          {
            message: 'Quoted get is prohibited',
            type: 'Property'
          }
        ]
      },
      {
        code: 'var test = {set "foo"(bar) {}};',
        errors: [
          {
            message: 'Quoted set is prohibited',
            type: 'Property'
          }
        ]
      }
    ]
  }
)