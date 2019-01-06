(() => {
    class Normalizer
    {
        create(options)
        {

        }

        channelsToNormal(channels)
        {
        }

        scaleVector(vector, magnitude)
        {
            let o = {
                x: vector.x * magnitude,
                y: vector.y * magnitude,
                z: vector.z * magnitude
            };

            return o;
        }

        addVector(v1, v2)
        {
            let o = {
                x: v1.x + v2.x,
                y: v1.y + v2.y,
                z: v1.z + v2.z
            };

            return o;
        }

        decodeChannel(ch)
        {
            if (ch <= 127)
            {
                ch = -(1.0-ch/127.0);
            }
            else
            {
                ch = (ch-128.0)/128.0;
            }

            return ch;
        }

        colorToNormal(r, g, b)
        {
            let n = {
                x: this.decodeChannel(r),
                y: this.decodeChannel(g),
                z: this.decodeChannel(b)
            };

            return n;
        }
    }
})();