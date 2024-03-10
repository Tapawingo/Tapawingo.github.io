<template>
    <!-- Welcome screen -->
    <div id="main_window" class="widget">
        <img class="widget-picture" src="/img/widgetCover.jpg">
        <div class="widget-content">
            <h1 class="widget-title">Tapawingo</h1>
            <div class="widget-date">{{ date }}</div>

            <div class="widget-search">
                <form action="https://duckduckgo.com/" method="GET" autocomplete="off">
                    <label for="q">></label>
                    <input autofocus id="q" name="q" type="search" placeholder="search with duckduckgo...">
                </form>
            </div>

            <StartPageNav v-bind="nav" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import '~/assets/styles/startpage/main.scss';

    const date: Ref<string> = ref('');

    const nav = {
        links: [
            {
                title: 'Uni',
                links: [
                    { href:'https://innsida.ntnu.no/start#/feed/', mask: 'Innsida NTNU' },
                    { href: "https://fsweb.no/studentweb/index.jsf", mask: "Studentweb" },
                    { href:'https://ntnu.blackboard.com/ultra/', mask: 'Blackboard' },
                    { href: 'https://capquiz.math.ntnu.no/', mask: 'CapQuiz' },
                    { href:'https://www.microsoft365.com/apps?auth=2', mask: 'Office 365' },
                    { href:'https://outlook.office.com/mail/', mask: 'Mail' }
                ]
            },
            {
                title: 'Media',
                links: [
                    { href:'https://www.netflix.com/browse', mask: 'Netflix' },
                    { href:'https://www.youtube.com/', mask: 'YouTube' },
                    { href:'https://aniwave.to', mask: 'AniWave' }
                ]
            },
            {
                title: '4Chan',
                links: [
                    { href:'https://4chan.org/wsg/', mask: '/wsg/' },
                    { href:'https://4chan.org/k/', mask: '/k/' },
                    { href:'https://4chan.org/g/', mask: '/g/' }
                ]
            },
            {
                title: 'Devshits',
                links: [
                    { href:'https://github.com/', mask: 'GitHub' },
                    { href:'https://stackoverflow.com/', mask: 'Stack Overflow' },
                    { href:'https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science&s=department_course_numbers.sort_coursenum', mask: 'OpenCourseWare' },
                    { href:'https://app.diagrams.net/', mask: 'draw.io' }
                ]
            },
            {
                title: 'Others',
                links: [
                    { href:'https://catbox.moe/', mask: 'Catbox' },
                    { href:'http://localhost', mask: 'localhost' },
                    { href:'https://www.dev.to/', mask: 'DEV' }
                ]
            }
        ]
    }

    onMounted(() => {
        setInterval(() => {
            var str = "";
            var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var clock = new Date();
            var now = new Date();

            str += months[clock.getMonth()] + " " + now.getDate() + ", " + clock.getFullYear() + " | " + ("0" + now.getHours()).slice(-2) +":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

            date.value = str;
        }, 1000);
    })
</script>
