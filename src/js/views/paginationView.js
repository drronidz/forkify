import View from "./view";
import icons from 'url:../../img/icons.svg'

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination')

    _generateMarkup() {
        const currentPage = this._recipeDATA.page
        const numberOfPages = Math.ceil(this._recipeDATA.results.length / this._recipeDATA.resultsPerPage)
        console.log(numberOfPages)

        // Page 1, and there are other pages
        if(currentPage === 1 && numberOfPages > 1) {
            return `
                <button data-goto ="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }

        // Last page
        if(currentPage === numberOfPages && numberOfPages > 1) {
            return `
                <button data-goto ="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `
        }

        // Other page
        if(currentPage < numberOfPages) {
            return `
                <button data-goto ="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto ="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                      <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }

        // Page 1, and there are no other pages
       return ``
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (event) {
            const button = event.target.closest('.btn--inline')
            if(!button) return

            console.log(button)
            const goToPage = +button.dataset.goto
            console.log(goToPage)
            // this._recipeDATA.page = parseInt(goToPage)
            handler(goToPage)
        })
    }
}

export default new PaginationView()