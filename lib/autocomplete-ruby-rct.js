'use babel';

import AutocompleteRubyRctProvider from './provider';

export default {
  activate() {
  },
  provide() {
    return new AutocompleteRubyRctProvider();
  }
};
