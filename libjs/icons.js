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

export default {
    chevron: svgChevron
}