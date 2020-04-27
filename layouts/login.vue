<template>
  <v-app>
    <v-content>
      <v-container
        class="grey lighten-4 fill-height"
        fluid>
        <v-row >
          <v-col class="col-md-12 ">
            <v-card
              class="mx-auto my-12"
              max-width="600"
              outlined
            >
              <v-list-item class="mt-8">
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline"> {{ $t('register.o_login') }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $t('register.o_sublogin') }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-form >
                <v-text-field
                  :label="$t('register.o_name')"
                  class="mx-4 mt-8"
                  :placeholder="$t('register.entermp')"
                  prepend-icon="mdi-account-circle"
                  :rules="[() => !!login || $t('register.required')]"
                  outlined
                  required
                />
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  :label=" $t('register.password')"
                  class="mx-4"
                  prepend-icon="mdi-lock"
                  :rules="[() => !!password || $t('register.required')]"

                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  outlined
                  required
                  @click:append="showPassword = !showPassword"
                />
                <v-btn :elevation="0" class="col-md-12 text-center" color="info">
                  {{$t('register.login')}}
                </v-btn>
              </v-form>
            </v-card>
            <div class="text-center">
              <p class="light-gray">{{$t('register.notrig')}} <nuxt-link :to="localePath('/register')">
                {{$t('register.o_register')}}
              </nuxt-link></p>
            </div>
          </v-col>
        </v-row>
        <Nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  },
  data () {
    return {
      showPassword: false
    }
  }
}
</script>
<style>
  .login-main-left {
    margin: auto;
    max-width: 335px;
  }
  .login-main-right.bg-white {
    border-radius: 2px;
    margin: auto;
    max-width: 561px;
  }
</style>
