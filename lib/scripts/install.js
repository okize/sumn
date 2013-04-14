// (note: passwords must be base64 encoded)

console.log('\n');
console.log(',adPPYba,  88       88  88,dPYba,,adPYba,   8b,dPPYba, ');
console.log('I8[    ""  88       88  88P\'   "88"    "8a  88P\'   `"8a');
console.log(' `"Y8ba,   88       88  88      88      88  88       88');
console.log('aa    ]8I  "8a,   ,a88  88      88      88  88       88');
console.log('`"YbbdP"\'   `"YbbdP\'Y8  88      88      88  88       88');
console.log('\n');

console.log('copying user configuration to file...');

// configurations
var userModel = {
  username: '',
  fullname: '',
  email: '',
  language: 'en',
  os: '',
  browser: '',
  useLocalServers: false,
  localDocumentationServer: '',
  localDevelopmentServer: '',
  localProductionServer: '',
  ftp: {
    host: '',
    port: 21,
    mediaPath: '',
    username: '',
    password: ''
  },
  cdn: {
    url: '',
    mediaPath: '',
    username: '',
    password: ''
  },
  smtp: {
    emailService: '',
    emailUser: '',
    emailPassword: ''
  },
  notifications: {
    create: {
      sendEmails: false,
      emailTemplateName: 'newSiteEmail',
      emailSubject: 'New microsite created: ',
      recipients: []
    },
    release: {
      sendEmails: false,
      emailTemplateName: 'releaseEmail',
      emailSubject: 'Release details for: ',
      recipients: []
    }
  }
};