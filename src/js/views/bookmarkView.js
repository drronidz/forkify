import View from "./View.js";
import previewView from "./previewView";

class BookmarkView extends View{
    _parentElement = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)'
    _message = ''

    _generateMarkup() {
        return this._recipeDATA
            .map(bookmark => previewView.render(bookmark, false))
            .join('')
    }
}

export default new BookmarkView()