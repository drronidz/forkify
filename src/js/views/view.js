import icons from 'url:../../img/icons.svg'

export default class View {
    _recipeDATA

    render(recipeDATA) {
        if(!recipeDATA || (Array.isArray(recipeDATA) && recipeDATA.length === 0))
            return this.renderError()
        this._recipeDATA = recipeDATA
        const markup = this._generateMarkup()
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(recipeDATA) {

        this._recipeDATA = recipeDATA
        const newMarkup = this._generateMarkup()

        const newDOM = document.createRange().createContextualFragment(newMarkup)
        const newElements = Array.from(newDOM.querySelectorAll('*'))
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'))

        // console.log('Current Elements :', currentElements)
        // console.log('new Elements :', newElements)

        newElements.forEach((newElement, i) => {
            const currentElement = currentElements[i]
            console.log(currentElement, newElement, newElement.isEqualNode(currentElement))

            // Update changed TEXT
            if(!newElement.isEqualNode(currentElement) &&
                newElement.firstChild?.nodeValue.trim() !== '') {
                // console.log('*', newElement.firstChild.nodeValue.trim())
                currentElement.textContent = newElement.textContent
            }

            // Update changed ATTRIBUTES
            if(!newElement.isEqualNode(currentElement)) {
                console.log(Array.from(newElement.attributes))
                Array.from(newElement.attributes).forEach(attribute => {
                    currentElement.setAttribute(attribute.name, attribute.value)
                })
            }
        })

    }


    _clear() {
        this._parentElement.innerHTML = ''
    }

    renderError(message = this._errorMessage) {
        const markup = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._message) {
        const markup = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>`
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
}