<template>
  <v-app id="inspire">
    <drawer ></drawer>
    <v-content>
      <v-container
        class="grey lighten-4 fill-height"
        fluid>
        <Nuxt />
      </v-container>
    </v-content>
    <vfooter></vfooter>
  </v-app>
</template>
<script>
import drawer from '../components/drawer'
import vfooter from '../components/vfooter'
export default {
  components: {
    drawer,
    vfooter
  }
}
</script>
