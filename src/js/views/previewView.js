import View from "./View.js";

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
                  </div>
                </a>
              </li>
        `
    }
}

export default new PreviewView()