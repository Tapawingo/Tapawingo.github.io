export class Circle {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public radius: number;
    public x: number;
    public y: number;
    public xSpeed: number;
    public ySpeed: number;
    public color: string;
    public opacity: number = 1;

    constructor (canvas: HTMLCanvasElement, color: string = '#D80000', radius: number = 0.75) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.radius = radius;
        this.x = (canvas.width - 2) * Math.random();
        this.y = (canvas.height - 2) * Math.random();
        this.xSpeed = Math.min(Math.random() - Math.random(), 0.1);
        this.ySpeed = Math.min(Math.random() - Math.random(), 0.1);
        this.color = color;
    }

    public draw = () => {
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
    };

    public update = () => {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x + this.radius > this.canvas.width) {
            this.x = this.canvas.width - this.radius;
            this.xSpeed = -this.xSpeed;
        };

        if (this.x < this.radius) {
            this.x = this.radius;
            this.xSpeed = -this.xSpeed;
        };

        if (this.y + this.radius > this.canvas.height) {
            this.y = this.canvas.height - this.radius;
            this.ySpeed = -this.ySpeed;
        }

        if (this.y < this.radius) {
            this.y = this.radius;
            this.ySpeed = -this.ySpeed;
        }
    }
}