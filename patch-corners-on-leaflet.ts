namespace L {
    export interface Map extends Evented {
        _controlCorners: {[name:string]: HTMLDivElement}
        _controlContainer: HTMLDivElement
    }
    L.Map.include({
        _initControlPos: function (this: L.Map) {
            let corners = this._controlCorners = {} as { [name: string]: HTMLDivElement },
                l = 'leaflet-',
                container = this._controlContainer =
                    L.DomUtil.create('div', l + 'control-container', this.getContainer());

            function createCorner(vSide: string, hSide: string) {
                const className = l + vSide + ' ' + l + hSide;

                corners[vSide + hSide] = L.DomUtil.create('div', className, container);
            }
            createCorner('top', 'center');
            createCorner('middle', 'center');
            createCorner('middle', 'left');
            createCorner('middle', 'right');
            createCorner('bottom', 'center');

            createCorner('top', 'left');
            createCorner('top', 'right');
            createCorner('bottom', 'left');
            createCorner('bottom', 'right');
            createCorner('abso', 'lute');
        }
    });
}