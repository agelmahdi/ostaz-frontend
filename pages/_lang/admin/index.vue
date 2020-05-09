<template>
  <div />
</template>

<script>
export default {
  middleware: ['auth-admin'],

  head () {
    return { title: this.$t('home.title') }
  }
}
</script>
