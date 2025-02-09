window.onload = () => {

    const root = document.getElementById('root')
    const searchContainer = document.getElementById('js-searchbar')

    const options = ['option1', 'option2', 'option3']
    const select = document.createElement('search-select')
    select.title = "This title"
    // select.text = "hello"
    searchContainer.appendChild(select)

}