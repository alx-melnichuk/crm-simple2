/*
 * const RB_* - Route branch.
 * const RP_* - Route parameter.
 * const RT_* - Route.
 */

export const RB_APP_TASK = 'app-task';
export const RB_LIST = 'list';
// router - "/app-task/list"
export const RT_APP_TASK_LIST = '/' + RB_APP_TASK + '/' + RB_LIST;

export const RB_VIEW = 'view';
export const RP_TASK_ID = 'taskId';
export const RB_VIEW_TASK_ID = RB_VIEW + '/:' + RP_TASK_ID;
// router - "/app-task/view/:taskId"
export const RT_APP_TASK_VIEW_TASK_ID = '/' + RB_APP_TASK + '/' + RB_VIEW_TASK_ID;
