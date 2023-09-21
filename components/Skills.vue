<template>
    <div class="skills">
        <div class="skills-languages">
            <h3><Icon icon="mdi:code"/> Languages</h3>
            <ul>
                <li v-for="lang in languages">{{ lang }}</li>
            </ul>
        </div>
        <div class="skills-tools">
            <h3><Icon icon="mdi:hammer-wrench"/> Tools</h3>
            <ul>
                <li v-for="tool in tools">{{ tool }}</li>
            </ul>
        </div>
        <div class="skills-frameworks">
            <h3><Icon icon="mdi:cube-outline"/> Technologies</h3>
            <ul>
                <li v-for="tech in technology">{{ tech }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Icon } from '@iconify/vue';

    const props = defineProps({
        languages: {
            type: Array<string>,
            default: []
        },
        tools: {
            type: Array<string>,
            default: []
        },
        technology: {
            type: Array<string>,
            default: []
        }
    });
</script>