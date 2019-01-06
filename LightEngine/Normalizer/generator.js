(() => {
    class Generator
    {
        run()
        {
            let normalsCanvas, frontCanvas, progressCBCounts = 0;

            function drawResults(results)
            {
                if (results.canvasName)
                {
                    if (results.canvasName == 'normals')
                    {
                        document.getElementById('normals').getContext('2d').drawImage(results.normals, results.x, results.y, results.width, results.height, results.x, results.y, results.width, results.height);
                    }
                    else
                    {
                        document.getElementById(results.canvasName).getContext('2d').drawImage(results.axises[results.canvasName], results.x, results.y, results.width, results.height, results.x, results.y, results.width, results.height);
                    }
                }
                else
                {
                    document.getElementById('normals').getContext('2d').drawImage(results.normals, 0, 0);
                    document.getElementById('diffuse').getContext('2d').drawImage(results.diffuse, 0, 0);

                    for (let i in results.axises)
                    {
                        let elem = document.getElementById(i);
                        elem.getContext('2d').drawImage(results.axises[i], 0, 0);
                    }
                }
            }

            let delay = options.delay, currentProcess = '', lastCanvasName = 'left';
        }
    }
})();