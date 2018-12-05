// Version originale :
// https://codepen.io/w3devcampus/pen/QpRGrz

export function loadAssets(assetsToBeLoaded, callback)
{
    let assetsLoaded = {};
    let loadedAssets = 0;
    let numberOfAssetsToLoad = Object.keys(assetsToBeLoaded).length;

    function isImage(url)
    {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    if (numberOfAssetsToLoad != 0)
    {
        for (let name in assetsToBeLoaded)
        {
            let url = assetsToBeLoaded[name].url;

            if (isImage(url))
            {
                assetsLoaded[name] = new Image();
                assetsLoaded[name].addEventListener('load', () => {
                    if (++loadedAssets >= numberOfAssetsToLoad)
                    {
                        callback(assetsLoaded);
                    }
                });
                assetsLoaded[name].src = url;
            }
            else
            {
                assetsLoaded[name] = new Howl({
                    urls: [url],
                    buffer: assetsToBeLoaded[name].buffer,
                    loop: assetsToBeLoaded[name].loop,
                    autoplay: false,
                    volume: assetsToBeLoaded[name].volume,
                    onload: function () {
                        if (++loadedAssets >= numberOfAssetsToLoad)
                        {
                            callback(assetsLoaded);
                        }
                    }
                });
            }
        }
    }
    else
    {
        callback(assetsLoaded);
    }
}