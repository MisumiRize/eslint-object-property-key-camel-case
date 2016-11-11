const camelCase = require('camelcase')

module.exports = {
  meta: {
    docs: {
      description: 'limit object get/set to camel case',
      category: 'Possible Errors',
      recommended: false
    },
    schema: []
  },
  create: (context) => {
    return {
      Property: (node) => {
        if (node.kind == 'init') {
          return
        }

        if (typeof node.key.name != 'undefined') {  // no quote
          if (node.key.name != camelCase(node.key.name)) {
            context.report({
              node: node,
              message: `Non camel-cased ${node.kind} is prohibited`
            })
          }
          return
        }

        // quoted
        if (node.key.value == camelCase(node.key.value)) {
          context.report({
            node: node,
            message: `Camel-cased ${node.kind} with quote is prohibited`
          })
        }
      }
    }
  }
}