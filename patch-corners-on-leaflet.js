var L;
(function (L) {
    L.Map.include({
        _initControlPos: function () {
            let corners = this._controlCorners = {}, l = 'leaflet-', container = this._controlContainer =
                L.DomUtil.create('div', l + 'control-container', this.getContainer());
            function createCorner(vSide, hSide) {
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
})(L || (L = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0Y2gtY29ybmVycy1vbi1sZWFmbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGF0Y2gtY29ybmVycy1vbi1sZWFmbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsQ0FBQyxDQThCVjtBQTlCRCxXQUFVLENBQUM7SUFLUCxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUNWLGVBQWUsRUFBRTtZQUNiLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBd0MsRUFDekUsQ0FBQyxHQUFHLFVBQVUsRUFDZCxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjtnQkFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUU5RSxTQUFTLFlBQVksQ0FBQyxLQUFhLEVBQUUsS0FBYTtnQkFDOUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFOUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzNFLENBQUM7WUFDRCxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDakMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvQixZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFakMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QixZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0IsWUFBWSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNoQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDLEVBOUJTLENBQUMsS0FBRCxDQUFDLFFBOEJWIn0=