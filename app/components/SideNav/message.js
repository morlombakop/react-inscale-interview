/*
 * SideNav Messages
 *
 * This contains all the text for the SideNav component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'inscaleInterview.component.SideNav';

export default defineMessages({
  homeNav: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  addNewsNav: {
    id: `${scope}.addNews`,
    defaultMessage: 'Add News',
  },
});
