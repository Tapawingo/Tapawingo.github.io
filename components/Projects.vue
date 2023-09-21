<template>
    <div class="project" v-for="project in projects">
        <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank">Learn More</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Project from '~/models/Project'

    const props = defineProps({
        projects: {
            type: Array<Project>,
            default: []
        }
    });
</script>