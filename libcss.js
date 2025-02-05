const min=false, $L=min?'':'\n', $T=min?'':'\t', $_=min?'':' '
const formatCssKey = (name) => name.replace(/([A-Z])/g, '-$1').replace(".","\.").toLowerCase()
, addCssProperty = (property) => (([...(Object.keys(property))]).map(k => $T+`${formatCssKey(k)}:${$_}${property[k]};${$L}`)).join("")
, addCssProperties = (properties) => (properties instanceof Array)?properties.map(p => addCssProperty(p)).join():addCssProperty(properties)
, addCssClass = (className, properties) => `${className==="*"?"":'.'}${formatCssKey(className)}${$_}{${$L}${addCssProperties(properties)}}${$L}`
, addCssRules = (rules) => [...Object.keys(rules)].map(r => addCssClass(r, rules[r])).join($L)+"\n"

, positions = () => addCssRules({
relative:{position:'relative'},
absolute:{position:'absolute'},
fixed:{position:'fixed'},
sticky:{position:'sticky'},
static:{position:'static'},
})

, flex = () => addCssRules({
flex:{display:'flex'},
flexRow:{flexDirection:'row'},
flexColumn:{flexDirection:'column'},
'flex-1':{flex:'1'},
justifyCenter:{justifyContent:'center'},
justifyBetween:{justifyContent:'space-between'},
justifyAround:{justifyContent:'space-around'},
justifyEvenly:{justifyContent:'evenly'},
})
, qsize=['',0,0.5,1,1.5,2,2.5,3,4,5,6,7,8,9,10,11,12,16,20,24,32,40,48,56,64,72,80,96,100]

, computePxArray = (p,attr,arr,kSuffix="px",vSuffix="px",extra=null) => {
    const o = {}
    arr.forEach(i => {o[`${p}${i!==''?`-${i}${kSuffix}`:''}`] = {[attr]:`${i!==''?i:'1'}${vSuffix}`}})
    if (extra) Object.keys(extra).forEach(k=>{o[`${p}-${k}`]={[attr]:extra[k]}})
    return o
}
, pxFor = (n,q,kSuffix="px",e=null)=>addCssRules(computePxArray(n,q,qsize,kSuffix, "px", e))

, computeRemArray = (p,attr,arr,kSuffix="rem",vSuffix="rem",extra=null) => {
    const o = {}
    arr.forEach(i => {if(i!=='')o[`${p}-${i}${kSuffix}`] = {[attr]:`${i*0.25}${vSuffix}`}})
    if (extra) Object.keys(extra).forEach(k=>{o[`${p}-${k}`]={[attr]:extra[k]}})
    return o
}
, remFor = (n,q,kSuffix="rem",e=null)=>addCssRules(computeRemArray(n,q,qsize,kSuffix,"rem",e))

, hcolors= {
transparent:'transparent',
black:'#000',white:'#fff',gray:'#888',silver:'#ccc',
red:'#f00',green:'#0f0',blue:'#00f',
yellow:'#ff0',cyan:'#0ff',magenta:'#f0f',orange:'#f80',purple:'#808',
brown:'#880',pink:'#f08',teal:'#0f8',lime:'#8f0',
indigo:'#08f',amber:'#ff8',emerald:'#0f8',sky:'#08f',violet:'#80f',
brass:'#b08',copper:'#c08',steel:'#888',
}
, colors = () => ([
    [...Object.keys(hcolors)].map(c => addCssRules({['text-'+c]: {color:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['bg-'+c]:{backgroundColor:hcolors[c]}})).join(''),
    [...Object.keys(hcolors)].map(c => addCssRules({['border-color-'+c]:{borderColor:hcolors[c],borderStyle:'solid'}})).join('')
].join($L))

, createStyleSheet = () => {
    const style = document.createElement('style')
    const html = [
        addCssClass("*",{boxSizing:'border-box',margin:'0',padding:'0'}),
        positions(),
        flex(),
        ...((['padding','margin','left','right','top','bottom','width','height']).map(p=>remFor(p[0],p))),
        ...((['padding','margin','left','right','top','bottom','width','height']).map(p=>pxFor(p[0],p))),
        addCssClass('wFull',{'width':'100%'}),
        addCssClass('hFull',{'height':'100%'}),
        pxFor('border','border',''),
        colors(),
        addCssClass('border-dashed',{borderStyle:'dashed'}),
    ].join('\n')
    style.innerHTML = html
    document.head.appendChild(style)
    console.log("%ccss-html:\n%c%s","color:orange","color:yellow",html)
}

createStyleSheet()
