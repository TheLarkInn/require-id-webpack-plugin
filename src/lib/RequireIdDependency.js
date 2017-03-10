const ModuleDependency = require('webpack/lib/dependencies/ModuleDependency');

class RequireIdDependency extends ModuleDependency {
  constructor(request, range) {
    super(request);
    this.range = range;
  }

  get type() { // eslint-disable-line
    return 'require.id';
  }
}

RequireIdDependency.Template = class RequireIdDependencyTemplate {
  apply(dep, source, outputOptions, requestShortener) { // eslint-disable-line
    if (!dep.range) return;
    const comment = outputOptions.pathinfo ? `/*! ${requestShortener.shorten(dep.request)} */ ` : '';
    let content;
    if (dep.module) {
      content = comment + JSON.stringify(dep.module.id);
    } else {
      content = require("webpack/lib/WebpackMissingModule").module(dep.request); // eslint-disable-line
    }
    source.replace(dep.range[0], dep.range[1] - 1, content);
  }

  getOptionalComment(shouldHaveComment, shortenedRequest) { // eslint-disable-line
    if (shouldHaveComment) {
      return '';
    }
    return `/*! require.id ${shortenedRequest} */`;
  }
};

module.exports = RequireIdDependency;
