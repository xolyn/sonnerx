/**
 * Sonner 样式：修改此模板即可调整外观（首次加载时注入到 <head>）。
 * 容器：data-position / data-stack 由 JS 写入。
 * 单条：data-color-scheme="dark" | "light"
 */
var SONNER_CSS = `
@font-face {
    font-family: inter;
    src: url('https://typekit.netlify.app/inter/InterLatin.woff2');
}

:root {
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

    --y: 0px;
    --offset: 0px;
    --scale: 1;

    /* Dark（默认 toast 暗色底） */
    --dark-50:  #f9fafb;
    --dark-100: #f3f4f6;
    --dark-300: #d1d5db;
    --dark-400: #9ca3af;
    --dark-700: #374151;
    --dark-800: #1f2937;
    --dark-900: #111827;
    --dark-400-hsl: 218 11% 65%;
    --dark-800-hsl: 215 28% 17%;

    /* Light（浅色卡片：高对比正文 + 柔和边框） */
    --light-50:  #fafafa;
    --light-100: #f4f4f5;
    --light-300: #e4e4e7;
    --light-400: #a1a1aa;
    --light-700: #52525b;
    --light-800: #3f3f46;
    --light-900: #18181b;
    --light-400-hsl: 240 5% 65%;
    --light-800-hsl: 240 6% 26%;
}

sonner-component {
    display: block;
    width: 350px;
    height: 0;
    position: fixed;
    z-index: 99999999;
    box-sizing: border-box;
}

sonner-component[data-position="br"] {
    bottom: 1.5rem;
    right: 1.5rem;
    top: auto;
    left: auto;
}
sonner-component[data-position="bl"] {
    bottom: 1.5rem;
    left: 1.5rem;
    top: auto;
    right: auto;
}
sonner-component[data-position="tr"] {
    top: 1.5rem;
    right: 1.5rem;
    bottom: auto;
    left: auto;
}
sonner-component[data-position="tl"] {
    top: 1.5rem;
    left: 1.5rem;
    bottom: auto;
    right: auto;
}

/* 底部堆叠：锚点在容器底，向上叠 */
sonner-component[data-stack="bottom"] sonner-toast-component {
    bottom: 0;
    top: auto;
}

/* 顶部堆叠：锚点在容器顶，向下叠 */
sonner-component[data-stack="top"] sonner-toast-component {
    top: 0;
    bottom: auto;
}

sonner-toast-component {
    position: absolute;
    opacity: 1;
    left: 0;
    width: 100%;
    transform: translateY(var(--y)) translateY(var(--offset)) scale(var(--scale));
    transition: transform 300ms var(--ease-in-out), opacity 300ms var(--ease-in-out), height 300ms var(--ease-in-out), box-shadow 300ms var(--ease-in-out);
    touch-action: none;
    box-sizing: border-box;
    padding: 1rem 1.25rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    min-height: 66px;
    border-radius: 0.5rem;
    font-family: inter, Arial, Helvetica, sans-serif;

    /* Dark 默认 */
    background: var(--dark-900);
    border: 1px solid var(--dark-800);

    &[data-button] {
        padding-right: 1rem;
    }

    copy-wrapper {
        display: grid;
        grid-template-rows: 1fr;
        gap: 0.25rem;
        width: 100%;
        flex: 1;

        h3 {
            display: block;
            color: var(--dark-100);
            font-size: 0.875rem;
            font-weight: 600;
        }

        p {
            display: block;
            color: var(--dark-400);
            font-size: 0.75rem;
            line-height: 1.375;
        }
    }

    button {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        padding: 0 0.75rem;
        background-color: hsl(var(--dark-800-hsl) / 0.87);
        border: none;
        height: 24px;
        border-radius: 4px;
        min-width: 53px;
        font-size: 0.75rem;
        color: var(--dark-300);

        &:hover {
            color: var(--dark-100);
            background-color: hsl(var(--dark-400-hsl) / 0.1);
        }

        &:focus-visible {
            color: var(--dark-100);
            background-color: hsl(var(--dark-400-hsl) / 0.1);
        }

        &:active {
            color: var(--dark-50);
            background-color: hsl(var(--dark-400-hsl) / 0.15);
        }
    }
}

sonner-toast-component[data-color-scheme="light"] {
    background: var(--light-50);
    border: 1px solid var(--light-300);
    box-shadow: 0 1px 2px hsl(var(--light-800-hsl) / 0.06);

    copy-wrapper h3 {
        color: var(--light-900);
    }

    copy-wrapper p {
        color: var(--light-700);
    }

    button {
        background-color: hsl(var(--light-800-hsl) / 0.12);
        color: var(--light-800);

        &:hover {
            color: var(--light-900);
            background-color: hsl(var(--light-400-hsl) / 0.18);
        }

        &:focus-visible {
            color: var(--light-900);
            background-color: hsl(var(--light-400-hsl) / 0.18);
        }

        &:active {
            color: var(--light-900);
            background-color: hsl(var(--light-400-hsl) / 0.28);
        }
    }
}
`;

(function injectSonnerStyles() {
    if (document.getElementById("soonerx-styles")) return;
    var el = document.createElement("style");
    el.id = "soonerx-styles";
    el.textContent = SONNER_CSS;
    (document.head || document.documentElement).appendChild(el);
})();

var SONNER_POSITIONS = { br: 1, bl: 1, tr: 1, tl: 1 };
var SONNER_SCHEMES = { dark: 1, light: 1 };

function sonnerNormalizePosition(v) {
    if (v != null && SONNER_POSITIONS[v]) return v;
    if (v != null) console.warn('Sonner: invalid position "' + v + '", use tl|tr|bl|br. Falling back to br.');
    return "br";
}

function sonnerNormalizeScheme(v) {
    if (v != null && SONNER_SCHEMES[v]) return v;
    if (v != null) console.warn('Sonner: invalid color_scheme "' + v + '", use dark|light. Falling back to dark.');
    return "dark";
}

function sonnerStackFromTop(position) {
    return position === "tl" || position === "tr";
}

var SonnerHost = class extends HTMLElement {
    constructor() {
        super();
        this.previous = void 0;
        this.queue = Array(3).fill(null);
        this.doUpdate = !0;
        this.skipNextUpdate = !1;
        this.timeoutID = void 0;
        this.dataset.position = "br";
        this.dataset.stack = "bottom";
    }
    connectedCallback() {
        document.addEventListener("visibilitychange", () => {
            this.doUpdate = !document.hidden;
            if (!this.doUpdate) this.skipNextUpdate = !0;
        });
        this.addEventListener("mouseenter", () => {
            this.doUpdate = !1;
            this.skipNextUpdate = !0;
            this.classList.add("expand");
            this.expand();
            if (this.timeoutID !== void 0) clearTimeout(this.timeoutID);
        });
        this.addEventListener("mouseleave", () => {
            this.timeoutID = setTimeout(() => {
                this.collapse();
                this.doUpdate = !0;
                this.classList.remove("expand");
                this.timeoutID = void 0;
            }, 80);
        });
        window.addEventListener("notify:sonner", (e) => {
            if (e?.detail) this.push(e.detail);
        });
        window.requestAnimationFrame(this.first.bind(this));
    }
    applyLayoutFromPush(position) {
        this.dataset.position = position;
        this.dataset.stack = sonnerStackFromTop(position) ? "top" : "bottom";
    }
    collapse() {
        for (let e = 0; e < 3; e++) {
            if (this.queue[e] !== null) this.queue[e].el.collapse();
        }
        this.style.height = "0px";
    }
    expand() {
        let acc = 0;
        for (let t = 0; t < 3; t++) {
            if (this.queue[t] !== null) {
                this.queue[t].el.expand(acc, this.dataset.stack === "top");
                acc += this.queue[t].el.height + 8;
            }
        }
        this.style.height = acc + "px";
    }
    loop(e) {
        let dt = (e - this.previous) * 0.001;
        this.previous = e;
        if (this.doUpdate) {
            if (this.skipNextUpdate) this.skipNextUpdate = !1;
            else {
                for (let s = 0; s < 3; s++) {
                    if (this.queue[s] !== null) {
                        if (this.queue[s].el.isConnected) this.queue[s]?.el?.update(dt);
                        else this.queue[s] = null;
                    }
                }
                this.reconcile();
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    reconcile() {
        for (let e = 2; e >= 0; e--) {
            if (this.queue[e] !== null) {
                if (e === 0) break;
                if (this.queue[e - 1] === null) {
                    this.queue[e - 1] = this.queue[e];
                    this.queue[e] = null;
                }
            }
        }
        for (let e = 0; e < 3; e++) {
            if (this.queue[e] !== null) this.queue[e].el.updateIndex(e);
        }
    }
    first(e) {
        this.previous = e;
        window.requestAnimationFrame(this.loop.bind(this));
    }
    push(e) {
        let t = Object.assign(
            {
                heading: "",
                message: "",
                el: null,
                duration: 5,
                classes: [],
                position: "br",
                color_scheme: "dark",
                button: {
                    callback: () => {},
                    label: "",
                    classes: "",
                    event: null,
                    eventData: null,
                },
            },
            e
        );
        t.position = sonnerNormalizePosition(t.position);
        t.color_scheme = sonnerNormalizeScheme(t.color_scheme);
        t.stackFromTop = sonnerStackFromTop(t.position);
        this.applyLayoutFromPush(t.position);

        if (t.duration === 1 / 0 || typeof t.duration != "number") {
            console.warn("Sonner duration must be a number. Defaulting to 5 seconds.");
            t.duration = 5;
        }
        Array.isArray(t.classes) || (t.classes = [t.classes]);
        typeof t.button?.callback != "function" && (t.button.callback = () => {});
        t.button?.classes || (t.button.classes = []);
        Array.isArray(t.button.classes) || (t.button.classes = [t.button.classes]);
        t.el = new SonnerToast(t);
        this.insert(t);
    }
    insert(e) {
        if (this.queue[2] !== null) this.queue[2]?.el?.delete();
        if (this.queue[1] !== null) this.queue[2] = this.queue[1];
        if (this.queue[0] !== null) this.queue[1] = this.queue[0];
        this.queue[0] = e;
        this.appendChild(this.queue[0].el);
    }
};

customElements.get("sonner-component") || customElements.define("sonner-component", SonnerHost);

var SonnerToast = class extends HTMLElement {
    constructor(e) {
        super();
        this.settings = e;
        this.life = e.duration;
        this.height = 66;
        this.y = 0;
        this.offset = 0;
        this.index = 0;
        this.dead = !1;
        this.scale = 1;
        this.isExpanded = !1;
        this.expandedOffset = 0;
        this.dataset.colorScheme = e.color_scheme === "light" ? "light" : "dark";
        if (e.button?.label) this.dataset.button = "";
        this.style.setProperty("--y", "0");
        this.style.setProperty("--opacity", "1");
        this.style.setProperty("--offset", "0px");
        this.style.setProperty("--scale", "1");
    }
    stackTop() {
        return this.closest("sonner-component")?.dataset.stack === "top";
    }
    connectedCallback() {
        this.innerHTML = `
            <copy-wrapper>
                ${this.renderHeading()}
                ${this.renderMessage()}
            </copy-wrapper>
            ${this.renderButton()}
        `;
        let btn = this.querySelector("button");
        if (btn) {
            btn.addEventListener("click", () => {
                this.settings.button.callback();
                if (this.settings.button?.event !== null) {
                    window.dispatchEvent(
                        new CustomEvent(this.settings.button.event, {
                            detail: this.settings.button?.eventData ?? null,
                        })
                    );
                }
                this.delete();
            });
        }
        let t = this.getBoundingClientRect();
        this.height = t.height;
        let fromTop = !!this.settings.stackFromTop;
        let enter = fromTop
            ? [{ opacity: 0, transform: "translateY(-100%)" }, { opacity: 1, transform: "translateY(0px)" }]
            : [{ opacity: 0, transform: "translateY(100%)" }, { opacity: 1, transform: "translateY(0px)" }];
        let s = this.animate(enter, {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.0, 0.0, 0.2, 1)",
        });
        s.finished.then(() => {
            this.style.setProperty("--y", `${this.y}px`);
            this.style.setProperty("--opacity", "1");
            s.cancel();
        });
    }
    renderHeading() {
        return this.settings.heading?.length ? `<h3>${this.settings.heading}</h3>` : "";
    }
    renderMessage() {
        return this.settings.message?.length ? `<p>${this.settings.message}</p>` : "";
    }
    renderButton() {
        return this.settings.button?.label
            ? `<button class="${this.settings.button.classes.join(" ")}">${this.settings.button.label}</button>`
            : "";
    }
    expand(acc, fromTop) {
        this.isExpanded = !0;
        this.expandedOffset = acc;
        this.style.setProperty("--offset", "0px");
        this.style.setProperty("--scale", "1");
        this.style.setProperty("--y", fromTop ? `${acc}px` : `-${acc}px`);
    }
    collapse() {
        let fromTop = this.stackTop();
        let off = fromTop ? `${this.offset}px` : `-${this.offset}px`;
        this.style.setProperty("--offset", off);
        this.style.setProperty("--scale", `${this.scale}`);
        this.style.setProperty("--y", `${this.y}px`);
    }
    updateIndex(e) {
        this.index = e;
        switch (e) {
            case 0:
                this.style.zIndex = "3";
                break;
            case 1:
                this.style.zIndex = "2";
                break;
            case 2:
                this.style.zIndex = "1";
                break;
        }
        this.offset = 16 * e;
        this.scale = 1 - 0.05 * e;
        let fromTop = this.stackTop();
        let off = fromTop ? `${this.offset}px` : `-${this.offset}px`;
        this.style.setProperty("--offset", off);
        this.style.setProperty("--scale", `${this.scale}`);
    }
    update(e) {
        this.life -= e;
        if (this.life <= 0 && this.isConnected && !this.dead) {
            this.dead = !0;
            this.delete();
        }
    }
    delete() {
        this.dead = !0;
        let anim;
        let fromTop = this.stackTop();
        if (this.isExpanded) {
            this.style.transformOrigin = "center";
            anim = this.animate(
                [{ opacity: 1 }, { opacity: 0 }],
                { duration: 150, fill: "forwards", easing: "cubic-bezier(0.4, 0.0, 1, 1)" }
            );
        } else {
            let sign = fromTop ? 1 : -1;
            let o = sign * this.offset;
            anim = this.animate(
                [
                    {
                        opacity: 1,
                        transform: `scale(${this.scale}) translateY(${this.y}px) translateY(${o}px)`,
                    },
                    {
                        opacity: 0,
                        transform: `scale(${this.scale - 0.05}) translateY(${this.y}px) translateY(${o}px)`,
                    },
                ],
                { duration: 200, fill: "forwards", easing: "cubic-bezier(0.4, 0.0, 1, 1)" }
            );
        }
        anim.finished.then(() => this.remove());
    }
};

customElements.get("sonner-toast-component") || customElements.define("sonner-toast-component", SonnerToast);

function soonerxMount() {
    if (globalThis.sonner) return;
    var a = new SonnerHost();
    document.body.appendChild(a);
    globalThis.sonner = a;
}

if (document.body) {
    soonerxMount();
} else {
    document.addEventListener("DOMContentLoaded", soonerxMount, { once: true });
}
