import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from "@ember/object";
import { inject as service } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { get } from '@ember/object';

export default ApolloService.extend({
  session: service(),

  link: computed(function() {
    const session = this.get('session');
    const link = this._super(...arguments);
    const authLink = setContext(async () => {
      const headers = {};
      const auth = get(session, 'isAuthenticated');
      const token = get(session, 'data.authenticated.token.value');
      if (auth && token) headers.Authorization = `Bearer ${token}`;
      return { headers };
    });
    return authLink.concat(link);
  }),
});
