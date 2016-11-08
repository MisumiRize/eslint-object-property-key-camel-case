const camelCase = require('camelcase')

function reportCamelCased(context, node) {
  context.report({
    node: node,
    message: 'Camel-cased property should not be quoted'
  })
}

function reportNonCamelCased(context, node) {
  context.report({
    node: node,
    message: 'Non camel-cased property should be quoted'
  })
}

module.exports = {
  meta: {
    docs: {
      description: 'limit object property to camel case',
      category: 'Possible Errors',
      recommended: false
    },
    schema: []
  },
  create: (context) => {
    return {
      MemberExpression: (node) => {
        if (!node.computed) {  // dotted
          if (node.property.name != camelCase(node.property.name)) {
            reportNonCamelCased(context, node)
          }
          return
        }

        // bracket
        if (typeof node.property.value != 'undefined'  // exclude reference by variable
          && node.property.value == camelCase(node.property.value)) {
            reportCamelCased(context, node)
        }
      },
      Property: (node) => {
        if (typeof node.key.name != 'undefined') {  // no quote
          if (node.key.name != camelCase(node.key.name)) {
            reportNonCamelCased(context, node)
          }
          return
        }

        // quoted
        if (node.key.value == camelCase(node.key.value)) {
          reportCamelCased(context, node)
        }
      }
    }
  }
}