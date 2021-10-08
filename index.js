function getContainerSizeY() {
  return document.getElementById('primary').offsetHeight;
}
function scrollWindow() {
  window.scrollBy(0, getContainerSizeY());
}

let buttons = 0;
let buttonsArrSize = 0;

function loaderStateChecker() {
  const prevContainerSize = getContainerSizeY();
  scrollWindow();
  setTimeout(() => {
    const newContainerSize = getContainerSizeY();
    if (prevContainerSize != newContainerSize) {
      loaderStateChecker();
    } else {
      buttons = Array.from(document.getElementsByTagName('tp-yt-paper-button'));
      buttons.forEach((button, index) => {
        if (!button.classList.contains('ytd-subscribe-button-renderer')) {
          buttons.splice(index, 1);
        }
      });
      buttonsArrSize = buttons.length;
      unsubscribeFromChannels();
    }
  }, 3000);
}
function unsubscribe() {
  const dialog = Array.from(
    document.querySelectorAll('.yt-confirm-dialog-renderer')
  );
  let removeSubscriptionBtn = null;
  dialog.forEach((elem, index) => {
    if (elem.id === 'confirm-button') {
      removeSubscriptionBtn = elem;
    }
  });
  let event = new Event('click', { bubbles: true });
  removeSubscriptionBtn.dispatchEvent(event);
}
let counter = 0;
function unsubscribeFromChannels() {
  if (counter != buttonsArrSize) {
    const button = buttons[counter];
    counter++;
    setTimeout(() => {
      clickButton(button);
    }, 2000);
    setTimeout(unsubscribe, 2000);
    unsubscribeFromChannels();
  } else {
    console.log('ended');
  }
}
function clickButton(button) {
  console.log(button);
  let event = new Event('click', { bubbles: true });
  button.dispatchEvent(event);
}
loaderStateChecker();
