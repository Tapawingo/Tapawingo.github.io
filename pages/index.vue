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
                <div class="seperator">----------------</div>
                <div>I'm a self-thaught Software and Web Developer from Norway.</div><br/>
                <table>
                    <tr> <td>Occupation:</td> <td>Currently studying for a bachelor in computer programming.</td> </tr>
                    <tr> <td>Motivation:</td> <td>I have a very strong passion for everything computers and love learning new technologies.</td> </tr>
                    <tr> <td>Facts:</td> <td>I'm into esoteric languages.</td> </tr>
                    <tr> <td>LinkedIn:</td> <td>eir-tep@hotmail.no</td> </tr>
                    <tr> <td>Contact:</td> <td>https://www.linkedin.com/in/eirik-dalsegg-teppen-608019206/</td> </tr>
                    <tr> <td>Tools:</td> <td>Git, Arduino, Raspberry-Pi, Linux, Windows, Unreal Engine</td> </tr>
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
            <div><span class="cmd">cd</span> <span class="arg">DIR</span> - <span class="description">Changes to given directory</span></div>
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
                <tr> <td>-r--r--r-- 1</td> <td>tapawingo</td> <td>tapawingo</td> <td>1530</td> <td>Aug 20 2023</td> <td>homepage</td> </tr>
                <tr> <td>-r--r--r-- 1</td> <td>tapawingo</td> <td>tapawingo</td> <td>153</td> <td>Aug 21 2023</td> <td>startpage</td> </tr>
                <tr> <td>-r--r--r-- 1</td> <td>tapawingo</td> <td>tapawingo</td> <td>1530</td> <td>Feb 04 2020</td> <td>github</td> </tr>
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

    const commands: Ref<Array<any>> = ref([
        { command: 'cd', args: ['DIR'], execute: (args: Array<string>) => {
            switch (args.join(' ')) {
                case 'homepage':
                    navigateTo('/');
                    return 'Redirecting to homepage';
                case 'startpage':
                    navigateTo('/startpage');
                    return 'Redirecting to startpage';
                case 'github':
                    navigateTo('https://github.com/Tapawingo', { external: true });
                    return 'Redirecting to github';
                default:
                return 'Unknown page';
            }
        } }
    ]);

    /* Autocomplete */
    const selection: Ref<string> = ref('');
    const suggestions: Ref<Array<string>> = ref([
        'cd',
        'homepage',
        'startpage',
        'github'
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
            return cmd.command === inputCmd;
        });

        var ret: string = command.execute(args);
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