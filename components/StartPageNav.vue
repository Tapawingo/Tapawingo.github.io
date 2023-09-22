<template>
    <nav>
        <div class="nav-container">
            <ul v-for="section in links">
                <a class="nav-subtitle">{{ section.title }}</a>
                <li v-for="link in section.links">
                    <a :href="link.href">{{ link.mask }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const props = defineProps({
        links: {
            type: Array,
            default: []
        }
    })
</script>