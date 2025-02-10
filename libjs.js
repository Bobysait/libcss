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
    width: 100%;
    height: 2.5rem;
    position: relative;
    transition: border-radius ${trans_SM} ${transD_0}, box-shadow ${trans_MD} ${transD_0};

    & .search-select-heading {
        cursor: pointer;
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
                background-color: #777;
            }
            
        }
    }
    & .search-select-title {
        cursor: pointer;
        user-select: none;
        color: #555;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
        width: 1.25rem;
        min-width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.25rem;
        color: #000;
        ${$_dark} {
            background-color: #555;
            color: #fff;
            &:hover {
                background-color: #777;
            }
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
        display: none;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0 0.5rem;
        opacity: 0;
        transition: opacity ${trans_LG} ${transD_MD} ;
        &[filtered="true"] {
            display: flex;
        }
    }
    & .search-select-input {
        background-color: transparent;
        border: none;
        width: 100%;
        height: 100%;
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
        gap: 0.25rem;
        padding: 0.5rem 0;
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
            &::-webkit-scrollbar { display: none; }
            -ms-overflow-style: none;
            scrollbar-width: none;
            padding: 0.5rem 0;
            min-height: 2rem;
            & .search-select-list, 
            & .search-select-selecteds {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
            }
            & .search-select-option {
                cursor: pointer;
                padding: 0.125rem 1rem;
                color: #fff;
                transition: background-color ${trans_MD} ease-in-out, color ${trans_MD} ease-in-out;
                &:hover {
                    background-color: #0bf;
                    color: #000;
                }
                &[filtered="true"] {
                    display: none;
                }
            }
            & .search-select-list .search-select-option {
                &[selected="true"] {
                    display: none;
                }
            }
            & .search-select-selecteds .search-select-option {
                background-color: #fd5;
                color: #000;
                &:hover {
                    background-color: #f80;
                    color: #000;
                }
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
        height: 250px;
        opacity: 1;
    }
    &[open="true"] .search-select-opener svg {
        transform: scale(1,-1);
    }
}`

class SearchSelect extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'value', 'placeholder', 'filtered', 'multiSelection', 'open']
    }

    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        const title = this.getAttribute("title")
        const placeholder = this.getAttribute("placeholder")
        const value = this.getAttribute("value")
        const filtered = this.getAttribute("filtered")
        const multiSelection = this.getAttribute("multi-selection")
        const open = (!!this.getAttribute("open")) ?? false

        console.log("filtered", filtered)

        this._open = open
        this._filtered = filtered

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
        this._inputContainer.setAttribute("filtered", this._filtered)
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
        this._scrollable.appendChild(this._list)
        this._content.appendChild(this._scrollable)
        
        this._wrapper.appendChild(this._heading)
        this._wrapper.appendChild(this._content)
    
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

        this._observer = null

        this._input.addEventListener("input", () => {
            this.filterItems(this._input.value)
        })
        this.filtered = filtered
        this._multiSelection = multiSelection
        this.onMutation = this.onMutation.bind(this)
        document.addEventListener("click", clickAwayListener)
        this._heading.addEventListener("click", openClose)

        this._updateOptions()
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

    _updateOptions () {
        const children = [...this.children].filter(child => child.tagName === "OPTION")
        children.forEach(child => {
            const option = document.createElement("div")
            option.textContent = child.textContent
            option.setAttribute("class", "search-select-option")
            option.setAttribute("value", option.getAttribute("value")??child.textContent)
            option.addEventListener("click", () => {
                if (!this._multiSelection) {
                    this._list.querySelectorAll(`.search-select-option`).forEach(c=>c.removeAttribute("selected"))
                    this._selecteds.innerHTML = ""
                }
                option.setAttribute("selected", true)
                const selected = document.createElement("div")
                selected.textContent = option.textContent
                selected.setAttribute("class", "search-select-option")
                selected.setAttribute("filtered", option.getAttribute("filtered"))
                selected.setAttribute("value", option.getAttribute("value"))
                selected.addEventListener("click", () => {
                    selected.remove()
                    option.removeAttribute("selected")
                })
                this._selecteds.appendChild(selected)
            })
            this._list.appendChild(option)
            console.log("child", child, option)
        })
    }

    set filtered(filtered) {
        console.log("Set filtered", filtered)
        this._filtered = filtered
        this._inputContainer.setAttribute("filtered", this._filtered)
    }

    get filtered() {
        return JSON.parse(this.getAttribute('filtered'))
    }

    set multiSelection(enabled) {
        console.log("Set multiSelection", enabled)
        this._multiSelection = enabled
    }
    get multiSelection() {
        return this._multiSelection
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
        if (!this._filtered) return
        console.log("%cfiltering: %c'%s'%c", "color:purple",  "color:orange", filter, "color:purple")
        const v = filter.toLowerCase()
        this._list.querySelectorAll(`.search-select-option`).forEach(option => {
            if (option.textContent.toLowerCase().includes(v)) {
                option.removeAttribute("filtered")
                console.log("preserved", option.getAttribute("value"))
            } else {
                option.setAttribute("filtered", true)
                console.log("filtered", option.getAttribute("value"))
            }
        })
    }

    updateItems(items) {
        console.log("update items", items)
    }
}

customElements.define("search-select", SearchSelect)
