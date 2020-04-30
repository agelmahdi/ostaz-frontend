<template>
  <v-app id="inspire">
    <drawer />
    <v-content>
      <v-container class="grey lighten-4 full-width" fluid>
        <Nuxt />
      </v-container>
    </v-content>
    <vfooter />
  </v-app>
</template>
<script>
import drawer from '../components/drawer'
import vfooter from '../components/vfooter'
export default {
  middleware: 'auth',
  components: {
    drawer,
    vfooter
  },
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  }
}
</script>
