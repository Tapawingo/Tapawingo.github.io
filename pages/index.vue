<template>
    <div class="terminal">
        <div class="command" :class="{ show: progress > 0 }">
            <span class="term">[
                <span class="username">anonymous</span>
                <span class="name-seperator">@</span>
                <span class="hostname">homepage</span>
                <span class="seperator">:</span>
                <span class="directory">~</span> ]$
            </span><span ref="commandInput1" class="commandtext">lslogins -u tapawingo</span>
        </div>
        <div class="userinfo" :class="{ show: progress > 1 }">
            <div class="img"></div>
            <div>
                <div>tapawingo@homepage</div>
                <div class="seperator">------------------</div>
                <div>I'm a self-taught Software and Web Developer from Norway.</div>
                <table>
                    <tr> <td>Occupation:</td> <td>Currently studying for a bachelor in computer programming.</td> </tr>
                    <tr> <td>Motivation:</td> <td>I have a very strong passion for everything computers and love learning new technologies.</td> </tr>
                    <tr> <td>Facts:</td> <td>I'm into esoteric languages.</td> </tr>
                    <tr> <td>Email:</td> <td>eir-tep@hotmail.no</td> </tr>
                    <tr> <td>Contact:</td> <td><a href="https://www.linkedin.com/in/eirik-dalsegg-teppen-608019206/">linkedin</a>, <a href="https://discord.com/users/155684062407688192">Discord</a></td> </tr>
                    <tr> <td>Tools:</td> <td>Git, Arduino, Raspberry-Pi, Linux, Windows, Unreal Engine, Gimp</td> </tr>
                    <tr> <td>Technologies:</td> <td>OpenGL, DearImGui, Vue.js, Nuxt.js, Node.js, Discord.js, Express.js, MySQL, SQLite, Tailwind</td> </tr>
                    <tr> <td>Languages:</td> <td>C, C++, x86 Assembly, Python, JavaScript, TypeScript, HTML, CSS, PHP, LUA</td> </tr>
                </table>
            </div>
        </div>
        <div class="command" :class="{ show: progress > 1 }">
            <span class="term">[
                <span class="username">anonymous</span>
                <span class="name-seperator">@</span>
                <span class="hostname">homepage</span>
                <span class="seperator">:</span>
                <span class="directory">~</span> ]$
            </span> <span ref="commandInput2">cheat homepage</span>
        </div>
        <div class="commandinfo" :class="{ show: progress > 2 }">
            <div v-for="command in commands"><span class="cmd">{{ command.name }}</span><span v-for="arg in command.args" class="arg"> {{ ' ' + arg }}</span> - <span class="description">{{ command.description }}</span></div>
        </div>
        <div class="command" :class="{ show: progress > 2 }">
            <span class="term">[
                <span class="username">anonymous</span>
                <span class="name-seperator">@</span>
                <span class="hostname">homepage</span>
                <span class="seperator">:</span>
                <span class="directory">~</span> ]$
            </span> <span ref="commandInput3">ls -l</span>
        </div>
        <div class="dirinfo" :class="{ show: progress > 3 }">
            total 42980
            <table>
                <tr v-for="page in cdPages"> <td>{{ page.perms[0] }}</td> <td>{{ page.perms[1] }}</td> <td>{{ page.perms[2] }}</td> <td>{{ page.size }}</td> <td>{{ page.date }}</td> <td>{{ page.name }}</td> </tr>
            </table>
        </div>
        <div class="command" :class="{ show: progress > 3 }">
            <span class="term">[
                <span class="username">anonymous</span>
                <span class="name-seperator">@</span>
                <span class="hostname">homepage</span>
                <span class="seperator">:</span>
                <span class="directory">~</span> ]$
            </span> 
            <input type="text" ref="userInput" v-forced-focus @keyup.enter="submitSelection" @keyup.tab="autoComplete" @change="updateSelection" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import '~/assets/styles/homepage/main.scss';

    const vForcedFocus = {
        mounted: (el: HTMLElement) => {
            el.focus();
            el.onblur = (event: Event) => {
                setTimeout(() => {
                    el.focus();
                }, 10);
            };
        }
    };

    const vFocus = {
        mounted: (el: HTMLElement) => {
            el.focus();
            el.focus();
        }
    };

    const progress: Ref<number> = ref(0);
    const commandInput1: Ref<null | HTMLElement> = ref(null);
    const commandInput2: Ref<null | HTMLElement> = ref(null);
    const commandInput3: Ref<null | HTMLElement> = ref(null);
    const userInput: Ref<null | HTMLElement> = ref(null);
    
    const cdPages: Ref<Array<any>> = ref([
        { name: 'homepage', url: '/', perms: ['-r--r--r-- 1', 'tapawingo', 'tapawingo'], size: '1530', date: 'Aug 20 2023' },
        { name: 'startpage', url: '/startpage', perms: ['-r--r--r-- 1', 'tapawingo', 'tapawingo'], size: '153', date: 'Aug 21 2023'  },
        { name: 'github', url: 'https://github.com/Tapawingo', perms: ['-r--r--r-- 1', 'tapawingo', 'tapawingo'], size: '6234', date: 'Feb 04 2020'  },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/eirik-dalsegg-teppen-608019206/', perms: ['-r--r--r-- 1', 'tapawingo', 'tapawingo'], size: '6234', date: 'Feb 04 2020'  },
        { name: 'discord', url: 'https://discord.com/users/155684062407688192', perms: ['-r--r--r-- 1', 'tapawingo', 'tapawingo'], size: '1541', date: 'Mar 05 2016'  },
    ]);

    const commands: Ref<Array<any>> = ref([
        { name: 'cd', args: ['DIR'], description: 'Changes to given directory', execute: (args: Array<string>) => {
            var arg: string = args.join(' ');
            var page = cdPages.value.find((page: any) => {
                return page.name === arg;
            });
            navigateTo(page.url, { external: true });
        } }
    ]);

    /* Autocomplete */
    const selection: Ref<string> = ref('');
    const suggestions: Ref<Array<string>> = ref([
        'cd',
        'homepage',
        'startpage',
        'github',
        'linkedin'
    ]);

    const updateSelection = (event: Event) => {
        if (userInput.value) {
            selection.value = (userInput.value as HTMLInputElement).value;
        };
    };

    const autoComplete = (event: Event) => {
        if (userInput.value) {
            var inputArr: Array<string> = selection.value.split(' ');
            var word: string | undefined = inputArr.pop();
            if (!word) return;
            
            var suggestion: string | undefined = suggestions.value.find((suggestion: string) => {
                return word === suggestion.slice(0, word!.length);
            });
            
            if (suggestion) {
                inputArr.push(suggestion);
                (userInput.value as HTMLInputElement).value = inputArr.join(' ');
                selection.value = inputArr.join(' ');
            }
        };
    };

    const submitSelection = (event: Event) => {
        var args: Array<string> = selection.value.split(' ');
        var inputCmd: string | undefined = args.shift();
        
        var command: any = commands.value.find((cmd: any) => {
            return cmd.name === inputCmd;
        });

        command.execute(args);
    }

    const typewrite = (el: HTMLElement | Element, speedmin: number = 38, speedmax: number = 42) => {
        return new Promise((resolve) => {
            var i = 0;
            var text = el.innerHTML;
            el.innerHTML = '';

            const write = () => {
                if (i < text.length) {
                    el.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(write, Math.random() * (speedmax - speedmin) + speedmin);
                } else {
                    resolve(true);
                }
            }
            setTimeout(write, Math.random() * (speedmax - speedmin) + speedmin);
        })
    };

    onMounted(async () => {
        progress.value++;
        await typewrite(commandInput1.value!);
        progress.value++;
        await typewrite(commandInput2.value!);
        progress.value++;
        await typewrite(commandInput3.value!);
        progress.value++;
    })

    useSeoMeta({
        title: 'ls logins -u tapawingo',
        ogTitle: 'ls logins -u tapawingo',
        description: 'Homepage of Tapawingo.',
        ogDescription: 'Homepage of Tapawingo.',
        ogImage: '',
        twitterCard: null,
    })
</script>