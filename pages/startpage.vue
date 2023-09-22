<template>
    <!-- Welcome screen -->
    <div id="main_window">
        <img id=leftImg src="/img/widgetCover.jpg" class="image">
        <div id="content">
            <h1 class="title">Tapawingo</h1>
            <div ref="date"></div>

            <div id="web_search">
                <form action="https://duckduckgo.com/" method="GET" autocomplete="off">
                    <label for="q">></label>
                    <input autofocus id="q" name="q" type="search" placeholder="search with duckduckgo...">
                </form>
            </div>

            <nav>
                <div id=links_container>
                    <ul>
                        <a class="subtitle">Uni</a>
                        <li><a href="https://innsida.ntnu.no/start#/feed/">Innsida NTNU</a></li>
                        <li><a href="https://ntnu.blackboard.com/ultra//">Blackboard</a></li>
                        <li><a href="https://www.microsoft365.com/apps?auth=2">Office 365</a></li>
                        <li><a href="https://outlook.office.com/mail/">Mail</a></li>
                        <li><a href="https://drive.google.com/drive/folders/1UZXVBcLjBzZ9mgY7Z2i4k6EdZC7dX_W_">Books</a></li>
                    </ul>
                    <ul>
                        <a class="subtitle">Media</a>
                            <li><a href="https://www.netflix.com/browse">Netflix</a></li>
                            <li><a href="https://www.youtube.com/">YouTube</a></li>
                            <li><a href="https://www.anix.to/">ANIX</a></li>
                    </ul>
                    <ul>
                        <a class="subtitle">4Chan</a>
                            <li><a href="https://4chan.org/wsg/">/wsg/</a></li>
                            <li><a href="https://4chan.org/k/">/k/</a></li>
                            <li><a href="https://4chan.org/g/">/g/</a></li>
                    </ul>
                    <ul>
                        <a class="subtitle">Devshits</a>
                            <li><a href="https://github.com/">GitHub</a></li>
                            <li><a href="https://stackoverflow.com/">Stack Overflow</a></li>
                            <li><a href="https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science&s=department_course_numbers.sort_coursenum">OpenCourseware</a></li>
                    </ul>
                    <ul>
                        <a class="subtitle">Others</a>
                            <li><a href="https://catbox.moe/">Catbox</a></li>
                            <li><a href="http://localhost:3000">localhost</a></li>
                            <li><a href="https://www.dev.to/">DEV</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import '~/assets/styles/startpage/main.scss';

    const date: Ref<null | HTMLElement> = ref(null);
    const updateDate = async () => {
        function doDate() {
            var str = "";
            var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var clock = new Date();
            var now = new Date();

            str += months[clock.getMonth()] + " " + now.getDate() + ", " + clock.getFullYear() + " | " + ("0" + now.getHours()).slice(-2) +":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
            if (date.value) {
                date.value.innerHTML = str;
            }
        }
        setInterval(doDate, 1000);
        doDate();
    };

    onMounted(() => {
        updateDate();
    })
</script>