/*
 * const RB_* - Route branch.
 * const RP_* - Route parameter.
 * const RT_* - Route.
 */

export const RB_APP_CLIENT = 'app-client';
export const RB_LIST = 'list';
// router - "/app-client/list"
export const RT_APP_CLIENT_LIST = '/' + RB_APP_CLIENT + '/' + RB_LIST;

export const RB_VIEW = 'view';
export const RP_CLIENT_ID = 'clientId';
export const RB_VIEW_CLIENT_ID = RB_VIEW + '/:' + RP_CLIENT_ID;
// router - "/app-client/view/:clientId"
export const RT_APP_CLIENT_VIEW_CLIENT_ID = '/' + RB_APP_CLIENT + '/' + RB_VIEW_CLIENT_ID;
