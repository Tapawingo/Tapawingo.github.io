<template>
    <div class="profile">
        <div class="profile-picture"></div>
        <p class="profile-text">{{ description }}</p>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        description: {
            type: String,
            default: ''
        }
    })
</script>