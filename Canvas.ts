import Preconditions from "./Preconditions.js";

export default class Canvas {
    canvasElement: HTMLCanvasElement;
    drawingContext: CanvasRenderingContext2D;
    imageData: ImageData;
    pixels: Uint8ClampedArray;

    width: number;
    height: number;

    private constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = Preconditions.checkNotNull(canvasElement, 'canvasElement must not be null.');
        this.setWidth(256);
        this.setHeight(256);
        this.drawingContext = this.canvasElement.getContext('2d');
        this.imageData = this.drawingContext.getImageData(0, 0, this.width, this.height);
        this.pixels = this.imageData.data;
    }

    public static from(canvasElement: HTMLCanvasElement): Canvas {
        return new Canvas(canvasElement);
    }

    public setWidth(width: number): void {
        this.width = Preconditions.checkNotNull(width, 'Parameter width must not be null.');
        this.canvasElement.width = this.width;
    }

    public setHeight(height: number): void {
        this.height = Preconditions.checkNotNull(height, 'Parameter height must not be null.');
        this.canvasElement.height = this.height;
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.canvasElement.addEventListener(type, listener, options);
    }

    public render(): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                const r: number = x / (this.width - 1);
                const g: number = 1 - (y / (this.height - 1));
                const b: number = 0.25;

                const pixelPosition: number = (y * this.width + x) * 4;
                this.pixels[pixelPosition] = r * 255; // red
                this.pixels[pixelPosition + 1] = g * 255; // green
                this.pixels[pixelPosition + 2] = b * 255; // blue
                this.pixels[pixelPosition + 3] = 255; // alpha
            }
        }
        this.drawingContext.putImageData(this.imageData, 0, 0);
    }
}
