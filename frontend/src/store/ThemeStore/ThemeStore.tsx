import { makeAutoObservable } from "mobx";

export type ThemeMode = 'light' | 'dark'

export default class ThemeStore {
    theme: ThemeMode = 'light'

    constructor() {
        makeAutoObservable(this)
        this.initTheme()
    }

    private initTheme() {
        const savedTheme = localStorage.getItem('app-theme') as ThemeMode
        
        if (savedTheme) {
            this.theme = savedTheme
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            this.theme = prefersDark ? 'dark' : 'light'
        }
        this.applyThemeToHtml()
    }

    toggleTheme = () => {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('app-theme', this.theme)
        this.applyThemeToHtml()
    }

    private applyThemeToHtml() {
        document.documentElement.setAttribute('data-theme', this.theme)
    }
}