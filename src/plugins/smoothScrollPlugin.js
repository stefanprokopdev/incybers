/**
 * Docusaurus plugin to enable smooth scrolling for anchor links
 */

module.exports = function (context, options) {
  return {
    name: 'smooth-scroll-plugin',
    injectHtmlTags() {
      return {
        headTags: [],
      };
    },
    getClientModules() {
      return [require.resolve('../clientModules/smoothScroll.ts')];
    },
  };
};

