import Alpine from 'alpinejs'
import theme from '../composables/theme'
Alpine.data('global', () => ({
  ...theme()
}))
Alpine.start()