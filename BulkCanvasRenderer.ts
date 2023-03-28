namespace L {
	export interface Canvas extends Renderer {
		_updatePaths(): void;
		_redrawBounds: L.Bounds;
		_postponeUpdatePaths: boolean;
		_layers: { [name: string]: L.Path }
		_redraw(): void;
		_onZoomEnd(): void;
	}

	export class BulkCanvasRenderer extends L.Canvas {
		private _lastZoom: number;
		private _lastBounds: LatLngBounds;
		private currentAnimationFrame: number;
		
		override _updatePaths() {
			if (this._postponeUpdatePaths) { return; }

			const currentBounds = this._map.getBounds();
			const currentZoom = this._map.getZoom();
			const zoomChanged = currentZoom != this._lastZoom;
			this._lastZoom = currentZoom;

			let skipped: number = 0, updated: number = 0;
			this._redrawBounds = null;
			const layersToUpdate = new Array<Layer>();
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
			//console.log(`${updated}/${updated+skipped}`)
			new Promise(() => this.delayedUpdatedPaths(layersToUpdate));
		}

		delayedUpdatedPaths(layers: Array<Layer>) {
			if (this.currentAnimationFrame) cancelAnimationFrame(this.currentAnimationFrame);

			for (let i = 0; i < layers.length; i++) {
				layers[i]._update();
				if (this.currentAnimationFrame) cancelAnimationFrame(this.currentAnimationFrame);
			}

			this.currentAnimationFrame = requestAnimationFrame(() => {
				this._redraw();
				this.currentAnimationFrame = null;
			});
		}
		override _onZoomEnd() {
			this.batch((layer) => layer._project());
		}
		async batch(callback: (layer: L.Path) => void) {
			const promises = new Array<Promise<void>>();
			const keys = Object.keys(this._layers);
			const batchSize = Math.min(Math.max(Math.ceil(keys.length / 5), 1), keys.length);
			for (let i = 0; i < keys.length; i += batchSize) {
				promises.push(new Promise(()=>{
					let layer;
					let currentKey = i;				
					while (currentKey < keys.length && currentKey < (i + batchSize)) {
						layer = this._layers[keys[currentKey]];
						callback(layer);
						currentKey++;
					}
				}));
			}
			await Promise.all(promises);
		}
    }
}