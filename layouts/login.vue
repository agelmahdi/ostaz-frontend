<template>
  <v-app>
    <v-content>
      <v-container class="grey lighten-4 fill-height" fluid>
        <v-snackbar
          v-model="snackbar"
          :bottom="y === 'bottom'"
          :color="scolor"
          :left="x === 'left'"
          :timeout="stimeout"
          :top="y === 'top'"
        >
          {{ stext }}
          <v-btn
            dark
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <v-row>
          <v-col class="col-md-12">
            <v-card class="mx-auto my-12" max-width="600" outlined>
              <v-list-item class="mt-8">
                <v-list-item-avatar color="grey" />
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    {{ $t("register.o_login") }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("register.o_sublogin") }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  :label="$t('register.o_name')"
                  class="mx-4 mt-8"
                  :placeholder="$t('register.entermp')"
                  prepend-icon="mdi-account-circle"
                  :rules="emailRules"
                  outlined
                  required
                />
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :label="$t('register.password')"
                  class="mx-4"
                  prepend-icon="mdi-lock"
                  :rules="[() => !!password || $t('register.required')]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  outlined
                  required
                  @click:append="showPassword = !showPassword"
                />
                <v-btn
                  :disabled="!valid"
                  :elevation="0"
                  class="col-md-12 text-center"
                  color="info"
                  @click="login"
                >
                  {{ $t("register.login") }}
                </v-btn>
              </v-form>
            </v-card>
            <div class="text-center">
              <p class="light-gray">
                {{ $t("register.notrig") }}
                <nuxt-link :to="localePath('/register')">
                  {{ $t("register.o_register") }}
                </nuxt-link>
              </p>
            </div>
          </v-col>
        </v-row>
        <Nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
// import AuthService from '../AuthService'

import { mapGetters, mapActions } from 'vuex'
import { isRelativeURL } from '../utils/nuxtjs-auth'
export default {
  components: {},
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      msg: '',
      data: [],
      showPassword: false,
      scolor: '',
      smode: '',
      colors: ['success', 'info', 'error', 'cyan darken-2'],
      snackbar: false,
      stext: '',
      stimeout: 2000,
      x: null,
      y: 'top',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      errors: []
    }
  },
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.redirect()
    }
  },
  computed: {
    ...mapGetters({
      redirectable: 'redirectable'
    })
  },
  methods: {

    ...mapActions({ redirectLogin: 'reirectedLogin' }),
    redirect () {
      if (this.$route.query.next && isRelativeURL(this.$route.query.next)) {
        this.$router.push(this.$route.query.next)
      } else {
        this.$router.push(this.localePath('/'))
      }
    },
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        }).catch((e) => {
          console.log(e.message)
          this.snackbar = true
          this.scolor = 'error'
          this.stext = 'Please enter correct username and password'
        })
        if (this.redirectable) {
          this.$router.back()
          return
        }

        this.redirect()
        // const response = await AuthService.login(credentials)
        // this.msg = response.msg
        // const token = response.token
        // const user = response.user
        // this.$store.dispatch('login', { token, user });
        if (this.$auth.loggedIn) {
          console.log('Successfully Logged In')
          // this.$route.push(localePath('/'))
          this.snackbar = true
          this.scolor = 'success'
          this.stext = 'Successfully Logged In'
        }
      } catch (e) {
        this.snackbar = true
        this.scolor = 'error'
        this.stext = 'Something went wrong'
      }
    }
  }
}
</script>
