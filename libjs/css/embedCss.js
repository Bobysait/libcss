const PREFIX_CSS_ID = "libcss-embed-css-"

const variables_transition = {
    "trans_0": "0s",
    "transD_0": "0s",
    "transD_SM": "0s",
    "transD_MD": "0.1s",
    "transD_LG": "0.2s",
    "transD_XL": "0.25s",
    "trans_SM": "0.15s",
    "trans_MD": "0.2s",
    "trans_LG": "0.25s",
}

const _embedCss = (id, css) => {
    const style = document.createElement('style')
    style.setAttribute('id', id)
    style.innerHTML = css
    document.head.appendChild(style)
}

const _initCss = () => {
    const rootId = `${PREFIX_CSS_ID}root`
    if (document.getElementById(rootId)) return true
    const rootCss = `:root{\n${[...Object.keys(variables_transition)].map(k => `\t--${k}: ${variables_transition[k]};`).join('\n')}\n}`
    _embedCss(rootId, rootCss)
}

const loadCss = (key, css) => {
    const cssId = `${PREFIX_CSS_ID}${key}`
    if (!document.getElementById(cssId)) _embedCss(cssId, css)
}

export const shadowCss = (shadow, key, css) => {
    const style = document.createElement("style")
    style.textContent = css
    shadow.appendChild(style)
}

_initCss()

export default loadCss