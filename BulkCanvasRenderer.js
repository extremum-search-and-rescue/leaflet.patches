var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L;
(function (L) {
    class BulkCanvasRenderer extends L.Canvas {
        _updatePaths() {
            if (this._postponeUpdatePaths) {
                return;
            }
            const currentBounds = this._map.getBounds();
            const currentZoom = this._map.getZoom();
            const zoomChanged = currentZoom != this._lastZoom;
            this._lastZoom = currentZoom;
            let skipped = 0, updated = 0;
            this._redrawBounds = null;
            const layersToUpdate = new Array();
            for (var id in this._layers) {
                const layer = this._layers[id];
                const layerBounds = layer._bounds;
                if (!layerBounds || !layerBounds.isValid()) {
                }
                else if (!zoomChanged) {
                    if (!currentBounds.intersects(layerBounds)) {
                        skipped++;
                        continue;
                    }
                    if (this._lastBounds.contains(layerBounds)) {
                        skipped++;
                        continue;
                    }
                }
                layersToUpdate.push(layer);
                updated++;
            }
            this._lastBounds = currentBounds;
            new Promise(() => this.delayedUpdatedPaths(layersToUpdate));
        }
        delayedUpdatedPaths(layers) {
            if (this.currentAnimationFrame)
                cancelAnimationFrame(this.currentAnimationFrame);
            for (let i = 0; i < layers.length; i++) {
                layers[i]._update();
                if (this.currentAnimationFrame)
                    cancelAnimationFrame(this.currentAnimationFrame);
            }
            this.currentAnimationFrame = requestAnimationFrame(() => {
                this._redraw();
                this.currentAnimationFrame = null;
            });
        }
        _onZoomEnd() {
            this.batch((layer) => layer._project());
        }
        batch(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                const promises = new Array();
                const keys = Object.keys(this._layers);
                const batchSize = Math.min(Math.max(Math.ceil(keys.length / 5), 1), keys.length);
                for (let i = 0; i < keys.length; i += batchSize) {
                    promises.push(new Promise(() => {
                        let layer;
                        let currentKey = i;
                        while (currentKey < keys.length && currentKey < (i + batchSize)) {
                            layer = this._layers[keys[currentKey]];
                            callback(layer);
                            currentKey++;
                        }
                    }));
                }
                yield Promise.all(promises);
            });
        }
    }
    L.BulkCanvasRenderer = BulkCanvasRenderer;
})(L || (L = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsa0NhbnZhc1JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQnVsa0NhbnZhc1JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQVUsQ0FBQyxDQXFGVjtBQXJGRCxXQUFVLENBQUM7SUFVVixNQUFhLGtCQUFtQixTQUFRLENBQUMsQ0FBQyxNQUFNO1FBS3RDLFlBQVk7WUFDcEIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBRTFDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDNUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QyxNQUFNLFdBQVcsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUU3QixJQUFJLE9BQU8sR0FBVyxDQUFDLEVBQUUsT0FBTyxHQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLGNBQWMsR0FBRyxJQUFJLEtBQUssRUFBUyxDQUFDO1lBQzFDLEtBQUssSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFFbEMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtpQkFFM0M7cUJBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7d0JBQzNDLE9BQU8sRUFBRSxDQUFDO3dC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