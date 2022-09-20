import View from './View.js';
import { PreviewView } from './previewView.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends PreviewView {
  _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _parentElement = document.querySelector('.bookmarks__list');
  _message;
  _generateMarkup() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarksView();
