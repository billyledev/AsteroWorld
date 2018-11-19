// Version originale :
// https://codepen.io/w3devcampus/pen/QpRGrz

export function loadAssets(assetsToBeLoaded, callback)
{
    let assetsLoaded = {};
    let loadedAssets = 0;
    let numberOfAssetsToLoad = Object.keys(assetsToBeLoaded).length;

    for (let name in assetsToBeLoaded)
    {
        let url = assetsToBeLoaded[name].url;

        assetsLoaded[name] = new Image();
        assetsLoaded[name].addEventListener('load', () => {
            if (++loadedAssets >= numberOfAssetsToLoad)
            {
                callback(assetsLoaded);
            }
        });
        assetsLoaded[name].src = url;
    }
}