export default () => (<{
  checkTheme() : void
  init() : void
  theme: 'light' | 'dark'
  toggleTheme() : void,
  $watch: any
}>{
  checkTheme() {
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme && (selectedTheme === 'dark' || selectedTheme === 'light')) {
      this.theme = selectedTheme
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.checkTheme)
    }
  },
  init() {
    this.checkTheme()
    this.$watch('theme', () => {
      document.querySelector('html')!.className = this.theme
    })
  },
  theme: 'light',
  toggleTheme() {
    if (this.theme === 'dark') {
      this.theme = 'light'
    } else {
      this.theme = 'dark'
    }
    localStorage.setItem('theme', this.theme)
  }
})