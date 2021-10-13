import View from "./View.js";
import icons from 'url:../../img/icons.svg' // Parcel 2

class PreviewView extends View {
    _parentElement = ''

    _generateMarkup() {
        const id = window.location.hash.slice(1)
        return `
             <li class="preview">
                <a class="preview__link ${this._recipeDATA.id === id ? 'preview__link--active' : ''}" 
                href="#${this._recipeDATA.id}">
                  <figure class="preview__fig">
                    <img src="${this._recipeDATA.imageURL}" crossOrigin alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${this._recipeDATA.title}</h4>
                    <p class="preview__publisher">${this._recipeDATA.publisher}</p>
                      <div class="preview__user-generated ${this._recipeDATA.key ? '' : 'hidden'}">
                         <svg>
                              <use href="${icons}#icon-user"></use>
                         </svg>
                      </div>
                  </div>
                </a>
              </li>
        `
    }
}

export default new PreviewView()