import View from "./View";
import icons from "url:../../imgs/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // page 1 and there are more pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton("next", "right", currentPage + 1);
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton("prev", "left", currentPage - 1);
    }

    // other page
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupButton("prev", "left", currentPage - 1)}
        ${this._generateMarkupButton("next", "right", currentPage + 1)}
      `;
    }

    // page 1 and no other pages
    return "";
  }

  _generateMarkupButton(direction, arrow, page) {
    if (direction === "prev") {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${page}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
    }

    if (direction === "next") {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${page}">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
  }
}

export default new PaginationView();
