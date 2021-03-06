import Route from '@ember/routing/route';
import AppQueryMixin from '@identity-x/manage/mixins/app-query';
import gql from 'graphql-tag';
import fragment from '@identity-x/manage/graphql/fragments/access-level-list';

const query = gql`
  query AppAccessLevelsEdit($input: AccessLevelQueryInput!) {
    accessLevel(input: $input) {
      ...AccessLevelListFragment
      messages {
        loggedInNoAccess
        loggedOutNoAccess
      }
    }
  }
  ${fragment}
`;

export default Route.extend(AppQueryMixin, {
  model({ access_level_id: id }) {
    const input = { id };
    const variables = { input };
    return this.query({ query, variables, fetchPolicy: 'network-only' }, 'accessLevel');
  },
});
