const ParserHelpers = require('webpack/lib/ParserHelpers');
const RequireIdDependency = require('./RequireIdDependency');
const RequireIdDependencyParserPlugin = require('./RequireIdDependencyParserPlugin');

class RequireIdPlugin {
  apply(compiler) { // eslint-disable-line
    compiler.plugin('compilation', (compilation, params) => {
      const { normalModuleFactory } = params;

      compilation.dependencyFactories.set(RequireIdDependency, normalModuleFactory);
      compilation.dependencyTemplates.set(RequireIdDependency, new RequireIdDependency.Template());

      normalModuleFactory.plugin('parser', (parser) => {
        parser.apply(new RequireIdDependencyParserPlugin());
        parser.plugin('evaluate typeof require.id', ParserHelpers.evaluateToString('function'));
        parser.plugin('typeof require.id', ParserHelpers.toConstantDependency(JSON.stringify('function')));
      });
    });
  }
}

module.exports = RequireIdPlugin;
