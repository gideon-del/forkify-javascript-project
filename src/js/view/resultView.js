import View from './View.js';
import { PreviewView } from './previewView.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class ResultView extends PreviewView {
  _errorMessage = `No recipe found for your query. Please try again :)`;
  _parentElement = document.querySelector('.results');
  _message;
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultView();
