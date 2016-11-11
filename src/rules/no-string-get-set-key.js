module.exports = {
  meta: {
    docs: {
      description: 'limit object get/set to non-quoted style',
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
          return
        }

        // quoted
        context.report({
          node: node,
          message: `Quoted ${node.kind} is prohibited`
        })
      }
    }
  }
}