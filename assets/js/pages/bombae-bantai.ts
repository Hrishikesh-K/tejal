import Alpine from 'alpinejs'
import lazy from '../composables/lazy'
import theme from '../composables/theme'
lazy()
Alpine.data('global', () => ({
  ...theme()
}))
Alpine.start()