import { createBrowserHistory } from 'history';

export enum HISTORY_ACTION_TYPE {
  POP = 'POP',
  PUSH = 'PUSH',
}

export const browserHistory = createBrowserHistory();

export function push(targetUrl: string) {
  browserHistory.push(targetUrl);
}

export function redirect(targetUrl: string) {
  browserHistory.replace(targetUrl);
}

export function goBack() {
  browserHistory.goBack();
}
