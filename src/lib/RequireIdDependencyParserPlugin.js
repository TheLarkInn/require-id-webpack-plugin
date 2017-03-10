const RequireIdDependency = require('./RequireIdDependency');

class RequireIdDependencyParserPlugin {
  apply(parser) { // eslint-disable-line
    parser.plugin('call require.id', (expr) => {
      if (expr.arguments.length !== 1) return;
      const param = parser.evaluateExpression(expr.arguments[0]);

      if (!param.isString()) return;
      const dep = new RequireIdDependency(param.string, expr.range);

      dep.loc = expr.loc;
      parser.state.current.addDependency(dep);
      return true; // eslint-disable-line
    });
  }
}

module.exports = RequireIdDependencyParserPlugin;
