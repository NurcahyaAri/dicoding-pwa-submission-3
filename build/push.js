const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BAPTuy2Gk_U9Z1MrhK7Bq5czOknyUw2EafFAklDSy2JY1g9soMe_v_1Gk2H0tMvVOs0SJukllvbahEOXa-GciyE',
  privateKey: 'AOYsL2MtNkNwc_rW8k94foeoz1eEC8NEIKBDQ8p8pt8',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/c8KF19PSSu8:APA91bG5MnWE03CKcbRNy12SJFezM7-mpRUP6G_08YPiJs5sYkuHnZ91QWv_muMox2rMD1YtQwq0CWf4rBL2BJeaCv_6SNBmBa-Se0fh8pd8ZQ-r2RWaVDlrHxqkPosZRuge2vMTKv5f',
  keys: {
    p256dh: 'BPrt+y2IKBjWDKlph5hkOB5cMrq42uwuZcNF+lYE2pIzi/Lu/eSeLZPtpWye7rCpEg1zHriB0NcCkRwjegBAc0o=',
    auth: 'gezZViCh7vhPUV/uYNiVrQ==',
  },
};
const payload = 'Yay Aplikasi anda sudah bisa menerima notifikasi';

const options = {
  gcmAPIKey: '212518144410',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
