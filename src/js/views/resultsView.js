import view from './View';
import previewView from './previewView';

class resultsView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipe found! Please try again`;
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
