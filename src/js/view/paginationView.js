import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    const nextBtn = `
    <button data-goto=${
      currentPage + 1
    } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
    const prevBtn = `
    <button data-goto=${
      currentPage - 1
    }  class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
    `;
    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return nextBtn;
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return prevBtn;
    }
    //other page
    if (currentPage < numPages) {
      return `${nextBtn}
     ${prevBtn}
      `;
    }
    //Page 1, and there are no other pages
    return '';
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
}
export default new PaginationView();
