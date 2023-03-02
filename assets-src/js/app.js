
import '../scss/app.scss';

import Swup from '../../../swup/src/index.ts';

const options = {
  containers: ['#swup', '#nav'],
  cache: true,
  plugins: [],
};

const swup = new Swup(options);

let modalCloseUrl = null;
const setModalCloseUrl = e => {
  const wasFilterSet = Boolean(new URL(window.location.href).searchParams.get('filter'));
  if( wasFilterSet ) modalCloseUrl = window.location.href;
}
swup.on('transitionStart', setModalCloseUrl);

const applyModalCloseUrl = e => {
  if( modalCloseUrl == null ) return;
  document.querySelectorAll('[data-apply-modal-close-url]').forEach(el => el.href = modalCloseUrl);
}
swup.on('contentReplaced', applyModalCloseUrl);

const closeModalOnEscape = e => {
  if( e.key !== 'Escape' ) return;
  const closeLink = document.querySelector('a.character_close');
  if( !closeLink ) return;
  closeLink.click();
}
window.addEventListener('keydown', closeModalOnEscape)