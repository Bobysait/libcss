import icons from "../icons.js"
import css from "./searchselect.css.js"
import { shadowCss } from "../css/embedCss.js"

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

        shadowCss(shadow, "searchselect", css)
        // const style = document.createElement("style")
        // style.textContent = searchSelectClass

        this._opener.appendChild(icons.chevron())
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
        // shadow.appendChild(style)
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

export default SearchSelect