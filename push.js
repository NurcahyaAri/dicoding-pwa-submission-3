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
  endpoint: 'https://fcm.googleapis.com/fcm/send/faMLHm624tw:APA91bGmu3qaFN8yW_tYhSmAuwtfcN2sB3r7N8Jgogf55O2dJKys33csxnuoZQWTxdbIfJPDuuTy9R_QuCquOm9Q9TZhDjHqtKAbd7uHiVrrg2L_qgM9kF4b3feSVS0-wnQAhf3bpL3g',
  keys: {
    p256dh: 'BJGBizeU1/E1NS5mm7PK4mZVtjuDKETDtW982LHzMv6SUTWq3U1tud58pd5krW7Azh472tVx4aMf4Jfeaty33Us=',
    auth: '+b5z4/EznLeXsSsuvusG/Q==',
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
