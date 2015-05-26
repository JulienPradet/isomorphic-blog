export function isUrl(url) {
  if(!/^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6}))?([\/\w \.-]*)*\/?$/.test(url)) {
    return new Error('URL.matchFailed');
  }
};
