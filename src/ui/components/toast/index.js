/* eslint-disable no-undef */
const DoneToast = (message) => {
  M.toast({ html: message, classes: 'green lighten-2' });
};

const ErrorToast = (message) => {
  M.toast({ html: message, classes: 'red lighten-2' });
};

export {
  DoneToast,
  ErrorToast,
};
