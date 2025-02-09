const xmlns = "http://www.w3.org/2000/svg"
const svgChevron = () => {
    const icon = document.createElementNS(xmlns,"svg")
    icon.setAttributeNS(null, "viewBox", "0 0 20 10")
    icon.setAttributeNS(null, "width", 12)
    icon.setAttributeNS(null, "height", 12)
    icon.setAttributeNS(null, "fill", "currentColor")
    const g = document.createElementNS(xmlns, "g")
    const path = document.createElementNS(xmlns, "path")
    path.setAttributeNS(null, 'd', "M0 0 10 10 20 0 16 0 10 6 4 0")
    g.appendChild(path)
    icon.appendChild(g)
    return icon
}

const trans_0 = "0s"
const transD_0 = "0s"
const transD_SM = "0s"
const transD_MD = "0.1s"
const transD_LG = "0.2s"
const transD_XL = "0.25s"
const trans_SM = "0.15s"
const trans_MD = "0.2s"
const trans_LG = "0.25s"

const $_dark = "@media (prefers-color-scheme: dark)"

const searchSelectClass = `
.search-select-wrapper {
    & * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    font-family: sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
    height: 2.5rem;
    position: relative;
    transition: border-radius ${trans_SM} ${transD_0}, box-shadow ${trans_MD} ${transD_0};

    & .search-select-heading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        background-color: #fff;
        box-shadow: 0 6px 6px 1px #0002;
        ${$_dark} {
            background-color: #000;
        }

        &:hover .search-select-opener {
            background-color: #0bf;
            ${$_dark} {
                background-color: #05a;
            }
            
        }
    }
    & .search-select-title {
        display: flex;
        align-items: center;
        user-select: none;
        color: #555;
        width: 100%;
        height: 100%;
        &:placeholder {
            color: #999;
        }
        ${$_dark} {
            color: #ccc;
            &:placeholder {
                color: #999;
            }
        }
    }
    & .search-select-opener {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #abf;
        width: 1rem;
        height: 1rem;
        border: 1px solid #0006;
        border-radius: 0.25rem;
        color: #000;
        ${$_dark} {
            background-color: #038;
            border: 1px solid #fff6;
            color: #fff;
        }
        & svg {
            width: 0.5rem;
            height: 0.5rem;
            transition: transform ${trans_SM} ${transD_0};
            color: #000;
            ${$_dark} {
                color: #fff;
            }
        }
        &:hover {
            background-color: #0bf;
            ${$_dark} {
                background-color: #05a;
            }
        }
    }
    & .search-select-input-container {
        width: 100%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0 0.5rem;
        opacity: 0;
        transition: opacity ${trans_LG} ${transD_MD} ;
    }
    & .search-select-input {
        background-color: transparent;
        border: none;
        width: 100%;
        height: 100%;
        border: 1px solid #0002;
        padding: 0 0.5rem;
        &:focus {
            outline: none;
        }
        ${$_dark} {
            color: #fff;
        }
    }
    & .search-select-content {
        position: absolute;
        top: 2rem;
        left: 0;
        width: 100%;
        height: 0px;
        display: flex;
        flex-direction: column;
        padding: 0.25rem 0;
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        background-color: #fff;
        box-shadow: 0 6px 6px 1px #0002;
        visibility: hidden;
        opacity: 0;
        transform: scale(1,0) translateY(-5rem);
        transition: transform ${trans_MD} ${transD_SM}, visibility ${trans_SM} ${transD_0}, height ${trans_SM} ${transD_SM} ease-in-out, opacity ${trans_LG} ${transD_SM} ease-in-out;
        ${$_dark} {
            background-color: #000;
        }
        & .search-select-scrollable {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding: 0.25rem 0;
            min-height: 2rem;
            & .search-select-selecteds {
                display: flex;
                flex-wrap: wrap;
                gap: 0.25rem;
            }
            & .search-select-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.25rem;
            }
        }
    }

    &[open="true"] .search-select-heading {
        border-radius: 0.5rem 0.5rem 0 0;
        box-shadow: 0 0 0 0 #0000;
    }
    &[open="true"] .search-select-input-container {
        opacity: 1;
    }
    &[open="true"] .search-select-content {
        transform: scale(1,1) translateY(0rem);
        visibility: visible;
        height: 200px;
        opacity: 1;
    }
    &[open="true"] .search-select-opener svg {
        transform: scale(1,-1);
    }
}`

// const clickawayListener = (e) => {
//     document.querySelectorAll("search-select").forEach((el) => {
//         if (!el.contains(e.target)) {
//             console.log("click ?")
//             el.open = false
//         }
//     })
// }

// document.addEventListener("click", clickawayListener)

class SearchSelect extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'value', 'placeholder', 'filtered', 'options', 'open']
    }

    constructor() {
        super()
        console.log("Constructeur appelé")
        const shadow = this.attachShadow({ mode: "open" })

        const title = this.getAttribute("title")
        const placeholder = this.getAttribute("placeholder")
        const value = this.getAttribute("value")
        const filtered = this.getAttribute("filtered")
        const open = (!!this.getAttribute("open")) ?? false
        const options = this.getAttribute("options")
        console.log("filtered", filtered)
        console.log("options", options)
        this._open = open
        this._filtered = filtered
        this._options = options

        this._wrapper = document.createElement("div")

        this._heading = document.createElement("div")
        this._title = document.createElement("label")
        this._opener = document.createElement("div")

        this._content = document.createElement("div")
        this._inputContainer = document.createElement("div")
        this._input = document.createElement("input")
        this._scrollable = document.createElement("div")
        this._selecteds = document.createElement("div")
        this._list = document.createElement("div")
        
        this._wrapper.setAttribute("open", this._open)
        this._wrapper.setAttribute("class", "search-select-wrapper")
        this._heading.setAttribute("class", "search-select-heading")
        this._title.setAttribute("class", "search-select-title")
        this._opener.setAttribute("class", "search-select-opener")
        this._content.setAttribute("class", "search-select-content")
        this._inputContainer.setAttribute("class", "search-select-input-container")
        this._input.setAttribute("class", "search-select-input")
        this._scrollable.setAttribute("class", "search-select-scrollable")
        this._selecteds.setAttribute("class", "search-select-selecteds")
        this._list.setAttribute("class", "search-select-list")

        this._title.textContent = title??''
        this._input.setAttribute("type", "text")
        this._input.setAttribute("placeholder", placeholder??'')
        this._input.setAttribute("value", value??'')

        const style = document.createElement("style")
        style.textContent = searchSelectClass

        this._opener.appendChild(svgChevron())
        this._heading.appendChild(this._title)
        this._heading.appendChild(this._opener)
        this._inputContainer.appendChild(this._input)
        this._content.appendChild(this._inputContainer)
        this._scrollable.appendChild(this._selecteds)
        this._list.appendChild(this._scrollable)
        this._content.appendChild(this._scrollable)

        this._wrapper.appendChild(this._heading)
        this._wrapper.appendChild(this._content)
    
        this.filtered = filtered
        this._observer = null
        this.onMutation = this.onMutation.bind(this)

        this._input.addEventListener("input", () => {
            this.filterItems(this._input.value)
        })

        const openClose = (e) => {
            this._wrapper.setAttribute("open", !this._open)
            this._open = !this._open
            e.preventDefault()
        }

        const clickAwayListener = (e) => {
            if (!this.contains(e.target)) {
                this.close()
            }
        }

        document.addEventListener("click", clickAwayListener)

        this._heading.addEventListener("click", openClose)

        this._updateOptions(this._options)
        shadow.appendChild(style)
        shadow.appendChild(this._wrapper)
    }

    connectedCallback() {
        this._observer = new MutationObserver(this.onMutation)
        this._observer.observe(this, {
            childList: true
        })
    }

    disconnectedCallback() {
        this._observer?.disconnect()
    }

    onMutation(mutations) {
        const added = []
        for (const mutation of mutations) {
            console.log('added',mutation.addedNodes)
          added.push(...mutation.addedNodes)
        }
        console.log({
          added: added.filter(el => el.nodeType === Node.ELEMENT_NODE),
        })
    }

    close() {
        this._wrapper.setAttribute("open", false)
        this._open = false
    }

    set title(title) {
        console.log("Set text", title)
        if (typeof title === "string") {
            this._title.textContent = title
        } else if (typeof title === "object") {
            this._title.textContent = JSON.stringify(title)
        }
        this._input.title = title
    }

    get title() {
        return JSON.parse(this.getAttribute('title'))
    }

    _updateOptions (options) {
        console.log("Update options", options)
        this._options = options
        this._list.innerHTML = ""
        this._options?.forEach(option => {
            const item = document.createElement("div")
            item.textContent = option
            this._list.appendChild(item)
        })
    }
    set options(options) {
        _updateOptions (options)
    }

    get options() {
        return this._options
    }

    set filtered(filtered) {
        console.log("Set text", filtered)
        this._filtered = filtered
        this._input.style.display = filtered ? "block" : "none"
    }

    get filtered() {
        return JSON.parse(this.getAttribute('filtered'))
    }

    set value(val) {
        console.log("Set text", val)
        this.setAttribute('value', JSON.stringify(value))
        this._input.value = val
    }

    get value() {
        return JSON.parse(this.getAttribute('value'))
    }

    set open(val) {
        console.log("Set Open", val)
        this._open = !!val
        this.setAttribute('open', this._open)
        this._wrapper.setAttribute("open", this._open)
    }

    get open() {
        return !!this.getAttribute('value')
    }

    set placeholder(placeholder) {
        console.log("Set placeholder", placeholder)
        this.setAttribute('placeholder', JSON.stringify(placeholder))
        this._input.value = val
    }

    get placeholder() {
        return JSON.parse(this.getAttribute('placeholder'))
    }

    filterItems(filter) {
        console.log("filter items", filter)
    }

    updateItems(items) {
        console.log("update items", items)
    }
}

customElements.define("search-select", SearchSelect)
