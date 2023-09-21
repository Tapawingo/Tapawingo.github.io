import { Circle } from "./Circle";

export class ParticleNetwork {
    private frameN: number = 0;
    private fps: number = 0;
    private entities: Array<Circle> = [];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    public particles: Array<Circle>;
    private mouseInput: any;
    private debugEnabled: boolean = false;
    private connections: boolean = false;

    constructor(canvas: HTMLCanvasElement, particles: Array<Circle> = [], options: any = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.particles = particles;
        this.updateFps();
        this.mouseInput = options.mouseInput ? options.mouseInput : useMouse({ target: window });
        this.debugEnabled = options.debug ? options.debug : false;
        this.connections = options.connections ? options.connections : true;

        window.requestAnimationFrame(this.render);
    }

    private render = () => {
        if (!this.ctx) return;
        this.frameN++;
        this.ctx.canvas.width  = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.draw();
        if (this.debugEnabled) this.debug();
        window.requestAnimationFrame(this.render);
    }

    private draw () {
        if (!this.ctx) return;
        this.entities = [];

        // Get scroll offset
        const mouseX = this.mouseInput.x.value;
        const mouseY = this.mouseInput.y.value;

        this.particles.forEach((particle: Circle) => {
            if (!this.ctx) return;
            let dx = Math.abs(mouseX - particle.x);
            let dy = Math.abs(mouseY - particle.y);
            let mouseDistance = 0.394 * (dx + dy + 0.554 * Math.max(dx, dy)); // faster distance approximation

            if (mouseDistance < 600) {
                particle.opacity = (600 - Math.min(mouseDistance, 600)) / 600;
                particle.draw();
                this.entities.push(particle);
    
                
                if (mouseDistance < 200 && this.connections) {
                    if (mouseDistance < 75) {
                        this.ctx.globalAlpha = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(mouseX, mouseY);
                        this.ctx.strokeStyle = '#34a1eb';
                        this.ctx.lineWidth = (200 - Math.min(mouseDistance, 200)) / 800;
                        this.ctx.stroke();
                    }

                    this.particles.forEach((particleSearch: Circle) => {
                        if (!this.ctx) return;
                        let dx = Math.abs(mouseX - particleSearch.x);
                        let dy = Math.abs(mouseY - particleSearch.y);
                        let mouseDistance = 0.394 * (dx + dy + 0.554 * Math.max(dx, dy));

                        let particleDx = Math.abs(particle.x - particleSearch.x);
                        let particleDy = Math.abs(particle.y - particleSearch.y);
                        let particleDistance = 0.394 * (particleDx + particleDy + 0.554 * Math.max(particleDx, particleDy));

                        if (mouseDistance < 200 && particleDistance < 100) {
                            this.ctx.globalAlpha = 1;
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(particleSearch.x, particleSearch.y);
                            this.ctx.strokeStyle = '#34a1eb';
                            this.ctx.lineWidth = (200 - Math.min(mouseDistance, 200)) / 800;
                            this.ctx.stroke();
                        }
                    });
                };
            };
        });

        // Draw mouse circle
        let mouseCircle = new Circle(this.canvas, '#6289ea', 1.5);
        mouseCircle.opacity = 1;
        mouseCircle.x = this.mouseInput.x.value;
        mouseCircle.y = this.mouseInput.y.value;
        mouseCircle.draw();
    }

    private update () {
        if (!this.ctx) return;
        this.particles.forEach((particle: Circle) => {
            particle.update();
        });
    }

    private debug () {
        if (!this.ctx) return;
        this.ctx.font = '12px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.globalAlpha = 1;
        this.ctx.fillText(`particles: ${ this.particles.length }`, 10, 20);
        this.ctx.fillText(`frame number: ${ this.frameN }`, 10, 40);
        this.ctx.fillText(`runtime: ${ performance.now() / 1000 }s`, 10, 60);
        this.ctx.fillText(`fps: ${ this.fps }fps`, 10, 80);
        this.ctx.fillText(`mouse: ${ this.mouseInput.x.value }, ${this.mouseInput.y.value}`, 10, 100);
        this.ctx.fillText(`entities: ${ this.entities.length }`, 10, 120);
    };

    private updateFps () {
        var oldFrameN = 0;
        setInterval(() => {
            this.fps = this.frameN - oldFrameN;
            oldFrameN = this.frameN
        }, 1000);
    }
}