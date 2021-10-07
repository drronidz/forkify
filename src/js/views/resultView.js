import icons from 'url:../../img/icons.svg'
import View from "./view.js";

class ResultView extends View {
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your query! Please try again'
    _message = ''

    _generateMarkup() {
        console.log(this._recipeDATA)
        return this._recipeDATA.map(this._generateMarkupPreview).join('')
    }
    _generateMarkupPreview(result) {
        return `
             <li class="preview">
                <a class="preview__link" href="#${result.id}">
                  <figure class="preview__fig">
                    <img src="${result.imageURL}" crossOrigin alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                  </div>
                </a>
              </li>
        `
    }
}

export default new ResultView()