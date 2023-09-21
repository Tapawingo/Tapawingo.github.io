<template>
    <canvas class="background" ref="canvas" width="1920" height="1080">Particle Network</canvas>
</template>

<script lang="ts" setup>
    import { Circle } from '~/models/Circle'
    import { ParticleNetwork } from '~/models/particleNetwork'

    const props = defineProps({
        options: {
            type: Object,
            default: {}
        }
    });

    const canvas: Ref<null | HTMLCanvasElement> = ref(null);

    onMounted(() => {
        const particles: Array<Circle> = [];
        if (!canvas.value) return;

        canvas.value.getContext('2d')!.canvas.width  = window.innerWidth;
        canvas.value.getContext('2d')!.canvas.height = window.innerHeight;
        
        var maxParticles = Math.floor(window.innerWidth * window.innerHeight) / 6912;
        
        for (let i = 1; i < maxParticles; i++) { 
            particles[i] = new Circle(canvas.value, Math.random() < 0.8 ? '#6289ea' : '#ea6962', Math.random() * (1.35 - 0.5) + 0.75);
        };

        new ParticleNetwork(canvas.value, particles, props.options);
    });

</script>