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
//# sourceMappingURL=BulkCanvasRenderer.js.map