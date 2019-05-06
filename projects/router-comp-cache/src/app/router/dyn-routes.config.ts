export interface State {
  title?: string;
  form?: {
    label?: string,
    name: string,
    value?: string
  }[];
  navigation?: {
    label?: string,
    path: string,
    outlet?: string
  }[];
}

export interface DynRoutes {
  config: {
    [key: string]: {
      dynPath: string,
      componentPath: string,
      data?: State
    }
  };
  '**': { redirectTo: string };
}

export const dynRoutes: DynRoutes = {
  config: {
    'overview': {
      dynPath: 'overview',
      componentPath: 'default-view',
      data: {
        title: 'Overview',
        form: [
          {
            label: 'Username',
            name: 'user',
            value: 'John Altman',
          }
        ],
        navigation: [
          {
            label: 'People',
            path: 'list-people'
          },
          {
            label: 'Server',
            path: 'list-server'
          }
        ]
      }
    },
    'list-people': {
      dynPath: 'list-people',
      componentPath: 'list-view',
      data: {
        title: 'People',
        form: [
          {
            label: 'Filter',
            name: 'filter',
            value: 'age > 32',
          }
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
            outlet: 'top'
          },
          {
            label: 'John Altman',
            path: 'altman-john',
            outlet: 'bottom'
          },
          {
            label: 'Mary Taylor',
            path: 'taylor-mary',
            outlet: 'bottom'
          }
        ]
      }
    },
    'list-server': {
      dynPath: 'list-server',
      componentPath: 'list-view',
      data: {
        title: 'Server',
        form: [
          {
            label: 'Filter',
            name: 'filter',
            value: 'uptime > 3d',
          }
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
            outlet: 'top'
          },
          {
            label: 'Webserver',
            path: 'webserver',
            outlet: 'bottom'
          },
          {
            label: 'Mailserver',
            path: 'mailserver',
            outlet: 'bottom'
          }
        ]
      }
    },
    'altman-john': {
      dynPath: 'altman-john',
      componentPath: 'detail-view',
      data: {
        title: 'John Altman',
        form: [
          {
            label: 'Firstname',
            name: 'firstname',
            value: 'John',
          },
          {
            label: 'Lastname',
            name: 'lastname',
            value: 'Altman',
          },
          {
            label: 'Email',
            name: 'email',
            value: 'john.altman@fakemail.com',
          },
          {
            label: 'Phone',
            name: 'phone',
            value: '+1 2000 30 40 50',
          }
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
          },
          {
            label: 'People',
            path: 'list-people',
          }
        ]
      }
    },
    'taylor-mary': {
      dynPath: 'taylor-mary',
      componentPath: 'detail-view',
      data: {
        title: 'Mary Taylor',
        form: [
          {
            label: 'Firstname',
            name: 'firstname',
            value: 'Mary',
          },
          {
            label: 'Lastname',
            name: 'lastname',
            value: 'Taylor',
          },
          {
            label: 'Email',
            name: 'email',
            value: 'mary.taylor@fakemail.com',
          },
          {
            label: 'Phone',
            name: 'phone',
            value: '+1 6000 70 80 90',
          }
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
          },
          {
            label: 'People',
            path: 'list-people',
          }
        ]
      }
    },
    'webserver': {
      dynPath: 'webserver',
      componentPath: 'detail-view',
      data: {
        title: 'Webserver',
        form: [
          {
            label: 'IP',
            name: 'ip',
            value: '10.0.8.10',
          },
          {
            label: 'Free storage',
            name: 'free-storage',
            value: '29 TB',
          },
          {
            label: 'Uptime',
            name: 'uptime',
            value: '7d 11h 9m 14s',
          },
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
          },
          {
            label: 'Server',
            path: 'list-server',
          }
        ]
      }
    },
    'mailserver': {
      dynPath: 'mailserver',
      componentPath: 'detail-view',
      data: {
        title: 'Mailserver',
        form: [
          {
            label: 'IP',
            name: 'ip',
            value: '10.0.8.20',
          },
          {
            label: 'Free storage',
            name: 'free-storage',
            value: '23 TB',
          },
          {
            label: 'Uptime',
            name: 'uptime',
            value: '28d 5h 13m 57s',
          },
        ],
        navigation: [
          {
            label: 'Overview',
            path: 'overview',
          },
          {
            label: 'Server',
            path: 'list-server',
          }
        ]
      }
    }
  },
  '**': {
    redirectTo: 'overview'
  }
};
