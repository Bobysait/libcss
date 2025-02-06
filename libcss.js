const min=1, $L=min?'':'\n', $T=min?'':'\t', $_=min?'':' '
const formatCssKey = (name) => name.replace(/([A-Z])/g, '-$1').replace(".","\\.").toLowerCase()
, addCssProperty = (property) => (([...(Object.keys(property))]).map(k => $T+`${formatCssKey(k)}:${$_}${property[k]};${$L}`)).join("")
, addCssProperties = (properties) => (properties instanceof Array)?properties.map(p => addCssProperty(p)).join():addCssProperty(properties)
, addCssClass = (className, properties) => `${className==="*"?"":'.'}${formatCssKey(className)}${$_}{${$L}${addCssProperties(properties)}}${$L}`
, addCssRules = (rules) => [...Object.keys(rules)].map(r => addCssClass(r, rules[r])).join($L)+"\n"
const numbers = (v0, v1, inc, est=false) => Array.from({length: Math.floor((v1 - v0) / inc) + (est?2:1)}, (_, i) => est&&i===0?'':v0 + ((est?i-1:i) * inc))
, numbersKV = (v0, v1, inc, est=false, sfx='') => {
    const o={};numbers(v0, v1, inc, est).forEach(i => o[`${i}`]=`${i}${sfx}`)
    return o
}
, dCss=(k,v)=>addCssRules({[v]:{[k]:formatCssKey(v)},})
, dCssArr=(k,arr)=>{
    const o = {}
    arr.forEach(i => o[`${i}`] = {[k]:formatCssKey(i)})
    return addCssRules(o)
}
, computePxArray = (p,attr,arr,kSuffix="px",vSuffix="px",extra=null) => {
    const o = {}
    arr.forEach(i => {o[`${p}${i!==''?`-${i}${kSuffix}`:''}`] = {[attr]:`${i!==''?i:'1'}${vSuffix}`}})
    if (extra) Object.keys(extra).forEach(k=>{o[`${p}-${k}`]={[attr]:extra[k]}})
    return o
}
, computeRemArray = (p,attr,arr,kSuffix="rem",vSuffix="rem",extra=null) => {
    const o = {}
    arr.forEach(i => {if(i!=='')o[`${p}-${i}${kSuffix}`] = {[attr]:`${i*0.25}${vSuffix}`}})
    if (extra) Object.keys(extra).forEach(k=>{o[`${p}-${k}`]={[attr]:extra[k]}})
    return o
}

const standardSizes = {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    '5xl': '3rem',
    'none': '0',
}
, qsize = numbers(0,100, 0.5,1)

const hcolors = {
transparent:'transparent',
black:'#000',white:'#fff',gray:'#888',silver:'#ccc',
red:'#f00',green:'#0f0',blue:'#00f',
yellow:'#ff0',cyan:'#0ff',magenta:'#f0f',orange:'#f80',purple:'#808',
brown:'#880',pink:'#f08',teal:'#0f8',lime:'#8f0',
indigo:'#08f',amber:'#ff8',emerald:'#0f8',sky:'#08f',violet:'#80f',
brass:'#b08',copper:'#c08',steel:'#888',
}
, pxFor = (n,q,kSuffix="px",e=null)=>addCssRules(computePxArray(n,q,qsize,kSuffix, "px", e))
, remFor = (n,q,kSuffix="rem",e=null)=>addCssRules(computeRemArray(n,q,qsize,kSuffix,"rem",e))

, normalizeCss=addCssClass("*",{boxSizing:'border-box',margin:'0',padding:'0'})
, positions = dCssArr('position',['relative','absolute','fixed','sticky','static'])
, displays = dCssArr('display', [
'block','flex','inline','inline-block','inline-flex','grid','none',
'table','table-cell','table-row','table-row-group',
'table-header-group','table-footer-group',
'table-column','table-column-group','table-caption','contents'
])
, flexs = addCssRules({
flexRow:{flexDirection:'row'},
flexColumn:{flexDirection:'column'},
justifyCenter:{justifyContent:'center'},
justifyBetween:{justifyContent:'space-between'},
justifyAround:{justifyContent:'space-around'},
justifyEvenly:{justifyContent:'evenly'},
flexWrap:{flexWrap:'wrap'},
flexWrapReverse:{flexWrap:'wrap-reverse'},
flexNowrap:{flexWrap:'nowrap'},
})
, flexValues = addCssRules(computePxArray('flex','flex',numbers(0.25,5, 0.25),'',''))
, borders = (() => {
    const o = {
        border:{borderWidth:'1px',borderStyle:'solid'},
        borderL:{borderLeftWidth:'1px',borderLeftStyle:'solid'},
        borderR:{borderRightWidth:'1px',borderRightStyle:'solid'},
        borderT:{borderTopWidth:'1px',borderTopStyle:'solid'},
        borderB:{borderBottomWidth:'1px',borderBottomStyle:'solid'},
        borderDashed:{borderWidth:'1px',borderStyle:'dashed'},
        borderDashedL:{borderLeftWidth:'1px',borderLeftStyle:'dashed'},
        borderDashedR:{borderRightWidth:'1px',borderRightStyle:'dashed'},
        borderDashedT:{borderTopWidth:'1px',borderTopStyle:'dashed'},
        borderDashedB:{borderBottomWidth:'1px',borderBottomStyle:'dashed'},
    }
    numbers(0.5,20, 0.5).forEach(i => {
        o[`border-${i}`] = {borderWidth:`${i}px`,borderStyle:"solid"}
        o[`border-l-${i}`] = {borderLeftWidth:`${i}px`,borderLeftStyle:"solid"}
        o[`border-r-${i}`] = {borderRightWidth:`${i}px`,borderRightStyle:"solid"}
        o[`border-t-${i}`] = {borderTopWidth:`${i}px`,borderTopStyle:"solid"}
        o[`border-b-${i}`] = {borderBottomWidth:`${i}px`,borderBottomStyle:"solid"}
        o[`border-dashed-${i}`] = {borderWidth:`${i}px`,borderStyle:"dashed"}
        o[`border-dashed-l-${i}`] = {borderLeftWidth:`${i}px`,borderLeftStyle:"dashed"}
        o[`border-dashed-r-${i}`] = {borderRightWidth:`${i}px`,borderRightStyle:"dashed"}
        o[`border-dashed-t-${i}`] = {borderTopWidth:`${i}px`,borderTopStyle:"dashed"}
        o[`border-dashed-b-${i}`] = {borderBottomWidth:`${i}px`,borderBottomStyle:"dashed"}
    })
    return addCssRules(o)
})()
, radii = (() => {
    const o = {
        roundedFull:{borderRadius:'50%'},
        roundedNone:{borderRadius:'0'},
        roundedLFull:{borderLeftRadius:'50%'},
        roundedLNone:{borderLeftRadius:'0'},
        roundedRFull:{borderRightRadius:'50%'},
        roundedRNone:{borderRightRadius:'0'},
        roundedTFull:{borderTopRadius:'50%'},
        roundedTNone:{borderTopRadius:'0'},
        roundedBFull:{borderBottomRadius:'50%'},
        roundedBNone:{borderBottomRadius:'0'},
    }
    const nbs = {['NULL']:'1px',...standardSizes, ...numbersKV(0,24, 0.5, 0, 'px')}
    Object.keys(nbs).forEach(k => {
        console.log(k,nbs[k])
        const k1=k!=='NULL'?`-${k}`:''
        const k2=`${nbs[k]}`
        o[`rounded${k1}`] = {borderRadius:k2}
        o[`rounded-l${k1}`] = {borderTopLeftRadius:k2,borderBottomLeftRadius:k2}
        o[`rounded-r${k1}`] = {borderTopRightRadius:k2,borderBottomRightRadius:k2}
        o[`rounded-t${k1}`] = {borderTopLeftRadius:k2, borderTopRightRadius:k2}
        o[`rounded-b${k1}`] = {borderBottomLeftRadius:k2, borderBottomRightRadius:k2}
        o[`rounded-tl${k1}`] = {borderTopLeftRadius:k2}
        o[`rounded-tr${k1}`] = {borderTopRightRadius:k2}
        o[`rounded-bl${k1}`] = {orderBottomLeftRadius:k2}
        o[`rounded-br${k1}`] = {borderBottomRightRadius:k2}
    })
    return addCssRules(o)
})()
, colors = ([
    [...Object.keys(hcolors)].map(c => addCssRules({['text-'+c]: {color:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['bg-'+c]:{backgroundColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-'+c]:{borderColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-l-'+c]:{borderLeftColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-r-'+c]:{borderRightColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-t-'+c]:{borderTopColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-b-'+c]:{borderBottomColor:hcolors[c]}})).join(''),
].join($L))

, createStyleSheet = () => {
    const style = document.createElement('style')
    const html = [
        normalizeCss,
        positions,
        displays,
        flexs,
        flexValues,
        pxFor('gap','gap'),remFor('gap','gap',''),
        pxFor('gap-x','column-gap'),remFor('gap-x','column-gap',''),
        pxFor('gap-y','row-gap'),remFor('gap-y','row-gap',''),
        ...((['padding','margin','left','right','top','bottom','width','height']).map(p=>remFor(p[0],p, ''))),
        ...((['padding','margin','left','right','top','bottom','width','height']).map(p=>pxFor(p[0],p))),
        addCssClass('wFull',{'width':'100%'}),
        addCssClass('hFull',{'height':'100%'}),
        borders,
        radii,
        colors,
    ].join('\n')
    style.innerHTML = html
    document.head.appendChild(style)
    // console.log("%ccss-html:\n%c%s","color:orange","color:yellow",html)
}

createStyleSheet()
