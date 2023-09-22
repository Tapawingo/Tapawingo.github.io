<template>
    <ParticleBackground v-bind="backgroundOptions" />
    <main ref="mainElement" @scroll="updateScrollTop">
        <section class="header" v-fade-in="{ topOffset: 0, bottomOffset: -800 }">
            <div class="heading">
                <span class="linebreak">Hey, I’m <span>Eirik</span>.</span>
                <span class="linebreak">I'm a full stack developer.</span>
            </div>
            <Icon icon="bi:chevron-down" />
        </section>
        <section class="about" v-fade-in="{ topOffset: 300, bottomOffset: -0 }">
            <h2>About</h2>
            <div class="about-content">
                <Profile v-bind="profile" v-slide-in="{ topOffset: 400, bottomOffset: -300 }" />
                <Skills v-bind="skills" v-slide-in="{ topOffset: 400, bottomOffset: -400 }" />
            </div>
        </section>
        <section class="projects" v-fade-in="{ topOffset: 300, bottomOffset: 0 }">
            <h2>Projects</h2>
            <div class="project-container" v-slide-in="{ topOffset: 300, bottomOffset: -300 }">
                <Projects :projects="projects" />
            </div>
        </section>
        <section class="contact" v-fade-in="{ topOffset: 300, bottomOffset: 0 }">
            <h2>Contact</h2>
            <form class="contact-form" @submit.prevent="">
                <p>Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.</p>
                <input type="text" name="name" class="contact-form-name" placeholder="Name" />
                <input type="mail" name="mail" class="contact-form-mail" placeholder="Email" />
                <textarea cols="30" name="message" rows="10" class="contact-text" placeholder="Message">(Backend is WIP)</textarea>
                <input type="submit" value="Submit" class="contact-submit" />
            </form>
        </section>
        <Footer />
    </main>
</template>

<script setup lang="ts">
    import '~/assets/styles/homepage/main.scss';
    import { Icon } from '@iconify/vue';
    
    const mainElement: Ref<null | HTMLCanvasElement> = ref(null);
    const scrollTop: Ref<number> = ref(0);

    const backgroundOptions = {
        options: {
            debug: false,
            connections: true,
            mouseInput: useMouse({ target: mainElement })
        }
    };

    const profile = {
        description: 'I’m a full stack developer with a deep passion for anything\
            computers. I’m experienced in both web and software development\
            and love learning new technologies. When I’m not at my computer\
            I go on hikes, collect militaria and play airsoft.'
    };

    const skills = {
        languages: ['C', 'C++', 'Python', 'Assembly', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SASS', 'PHP', 'LUA'],
        tools: ['Git', 'Arduino', 'Raspberry Pi', 'Linux', 'Windows', 'Unreal Engine', 'Gimp'],
        technology: ['OpenGL', 'DirectX12', 'Vulkan', 'DearImGui', 'QT', 'Vue.js', 'Nuxt.js', 'Node.js', 'Node.js', 'Discord.js', 'Express.js', 'MySQL', 'MongoDB', 'SQLite', 'Tailwind']
    };

    const projects = [
        {
            title: 'FreeTakServer',
            description: 'FTS is a Python3 implementation of a TAK Server for devices like ATAK, WinTAK, and \
                ITAK, it is cross-platform and runs from a multi node installation on AWS down to the Android edition.\
                It\'s free and open source.',
            link: 'https://freetakteam.github.io/FreeTAKServer-User-Docs/'
        },
        {
            title: 'Cluster Mission Framework (CMF3)',
            description: 'CMF3 is an effort by the Cluster Community Mod Team to enhance the \
                individual experience of our playerbase. It is an Arma 3 Mission Framework aiming to simplify\
                the mission development process for mission creators and to enhance the realism and immersion of \
                the individual players.',
            link: 'https://github.com/clustermod/CMF3'
        },
        {
            title: 'Cluster Community Homepage',
            description: 'The homepage for Cluster Community. Cluster Community is a online\
                video-game community mainly focusing creating realistic, immersive\
                experiences on Arma 3.',
            link: 'https://cluster-community.com/'
        }
    ];

    const updateScrollTop = (evt: UIEvent) => {
        scrollTop.value = (evt.target as HTMLElement).scrollTop;
    };

    const elementVisible = (el:HTMLElement, topOffset: number = 0, bottomOffset: number = 0): boolean => {
        const { top, bottom } = el.getBoundingClientRect();
        const { innerHeight } = window;

        // @BUG: If element is higher than viewport it gets hidden when top and bottom is outside
        return (
            ( top > 0 && (top + topOffset) < innerHeight ) ||
            ( (bottom + bottomOffset) > 0 && bottom < innerHeight)
        )
    };

    const vFadeIn = {
        mounted: (el: HTMLElement, binding: any) => {
            setInterval(() => {
                if (elementVisible(el, binding.value.topOffset, binding.value.bottomOffset)) {
                    el.classList.remove('transition-fade-out');
                    el.classList.add('transition-fade-in');
                } else {
                    el.classList.remove('transition-fade-in');
                    el.classList.add('transition-fade-out');
                }
            }, 5);
        }
    };

    const vSlideIn = {
        mounted: (el: HTMLElement, binding: any) => {
            setInterval(() => {
                if (elementVisible(el, binding.value.topOffset, binding.value.bottomOffset)) {
                    el.classList.remove('transition-slide-out');
                    el.classList.add('transition-slide-in');
                } else {
                    el.classList.remove('transition-slide-in');
                    el.classList.add('transition-slide-out');
                }
            }, 5);
        }
    };

    useHead({
        htmlAttrs: {
            lang: 'en'
        },
        link: [
            { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/icon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },
            { rel: 'mask-icon', href: '/icon/safari-pinned-tab.svg', color: '#ea6962' },
            { rel: 'manifest', href: '/site.webmanifest' },
        ],
        meta: [
            { name: 'msapplication-TileColor', content: '#2b5797' },
            { name: 'theme-color', content: '#ffffff' }
        ]
    });

    useSeoMeta({
        ogUrl: 'eirik.dalseggteppen.no',
        title: 'Eirik | Full Stack Developer',
        ogTitle: 'Eirik | Full Stack Developer',
        description: 'Homepage of Eirik "Tapawingo".',
        ogDescription: 'Homepage of Eirik "Tapawingo".',
        ogImage: '/icon/og-image.png',
        twitterCard: 'summary',
        twitterTitle: 'Eirik | Full Stack Developer',
        twitterDescription: 'Homepage of Eirik "Tapawingo".',
        twitterImage: '/icon/favicon.png',
    });
</script>