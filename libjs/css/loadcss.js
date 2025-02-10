const loadCss = (key, file) => {
    const cssId = `css-loader-${key}`
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = file;
        link.media = 'all';
        head.appendChild(link);
    }
}

export default loadCss