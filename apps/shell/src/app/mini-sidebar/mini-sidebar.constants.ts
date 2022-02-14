import { NavLink } from '@youtube/common-ui';

export const MINI_SIDEBAR_NAV_ENDPOINTS: NavLink[] = [
  {
    text: 'Home',
    url: '',
    icon: 'home',
    type: 'top',
  },
  {
    text: 'History',
    url: 'history',
    icon: 'history',
    type: 'bottom',
  },
  {
    text: 'Watch later',
    url: 'watchLater',
    icon: 'schedule',
    type: 'bottom',
  },
  {
    text: 'Liked videos',
    url: 'liked',
    icon: 'thumb_up_off_alt',
    type: 'bottom',
  },
];
