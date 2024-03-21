import view from './View';
import icons from '../../img/icons.svg';

class paginationView extends view {
  _parentEl = document.querySelector('.pagination');
  _currPage;
  _numOfPages;

  _setPages() {
    this._currPage = this._data.page;
    this._numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _btnNext() {
    this._setPages();
    return `<button data-goto="${
      this._currPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${this._currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
  _btnPrev() {
    this._setPages();
    return `<button data-goto="${
      this._currPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._currPage - 1}</span>
  </button>`;
  }

  _generateMarkup() {
    //Page 1 with other pages
    this._setPages();
    if (this._currPage === 1 && this._numOfPages > 1) {
      return this._btnNext();
    }
    //Last page
    if (this._currPage === this._numOfPages && this._numOfPages > 1) {
      return this._btnPrev();
    }
    //other page
    if (this._currPage < this._numOfPages) {
      const btn1 = this._btnPrev();
      const btn2 = this._btnNext();
      return `${btn1}${btn2}`;
    }
    //Page 1 and there are No other pages
    return '';
  }

  //   if (currPage === 1 && numOfPages > 1) {
  //     return `<button data-goto="${
  //       currPage + 1
  //     }" class="btn--inline pagination__btn--next">
  //     <span>Page ${currPage + 1}</span>
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-right"></use>
  //     </svg>
  //   </button>`;
  //   }
  //   //Last page
  //   if (currPage === numOfPages && numOfPages > 1) {
  //     return `<button data-goto="${
  //       currPage - 1
  //     }" class="btn--inline pagination__btn--prev">
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-left"></use>
  //     </svg>
  //     <span>Page ${currPage - 1}</span>
  //   </button>`;
  //   }
  //   //other page
  //   if (currPage < numOfPages) {
  //     return `<button data-goto="${
  //       currPage - 1
  //     }" class="btn--inline pagination__btn--prev">
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-left"></use>
  //     </svg>
  //     <span>Page ${currPage - 1}</span>
  //   </button>
  //   <button data-goto="${
  //     currPage + 1
  //   }" class="btn--inline pagination__btn--next">
  //     <span>Page ${currPage + 1}</span>
  //     <svg class="search__icon">
  //       <use href="${icons}#icon-arrow-right"></use>
  //     </svg>
  //   </button>`;
  //   }
  //   //Page 1 and there are No other pages
  //   return '';
  // }
}
export default new paginationView();
