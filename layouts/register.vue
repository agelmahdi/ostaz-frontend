<template>
  <v-app>
    <v-content>
      <v-container class="grey lighten-4 fill-height" fluid>
        <v-stepper v-model="e1" :alt-labels="false" class="col-md-12">
          <template>
            <v-stepper-header>
              <template v-for="n in 3">
                <v-stepper-step
                  :key="`${n}-step`"
                  :complete="e1 > n"
                  :step="n"
                  :editable="true"
                >
                  <h5 v-if="n === 1">
                    {{ $t("register.step1") }}
                  </h5>
                  <h5 v-else-if="n === 2">
                    {{ $t("register.step2") }}
                  </h5>
                  <h5 v-else>
                    {{ $t("register.step3") }}
                  </h5>
                </v-stepper-step>

                <v-divider v-if="n !== steps" :key="n" />
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content v-for="n in 3" :key="`${n}-content`" :step="n">
                <v-row v-if="n === 1">
                  <v-col class="col-md-12">
                    <v-card class="mx-auto my-12" width="1000" outlined>
                      <v-list-item class="mt-8">
                        <v-list-item-content>
                          <v-list-item-title class="headline">
                            {{ $t("register.o_register") }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ $t("register.o_register1") }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-form>
                        <v-text-field
                          ref="name"
                          v-model="name"
                          :rules="[() => !!name || $t('register.required')]"
                          :error-messages="errorMessages"
                          :label="$t('register.o_name')"
                          :placeholder="$t('register.entername')"
                          required
                          class="mx-4 mt-8"
                          prepend-icon="mdi-account-circle"
                          outlined
                        />
                        <v-text-field
                          ref="email"
                          v-model="email"
                          :type="text"
                          :rules="[() => !!email || $t('register.required')]"
                          :error-messages="errorMessages"
                          :label="$t('register.o_email')"
                          :placeholder="$t('register.emailaddess')"
                          required
                          class="mx-4"
                          prepend-icon="mdi-account-circle"
                          outlined
                        />

                        <v-text-field
                          ref="phone"
                          v-model="phone"
                          :rules="[() => !!phone || $t('register.required')]"
                          :error-messages="errorMessages"
                          :type="number"
                          :label="$t('register.o_phone')"
                          :placeholder="$t('register.enterphone')"
                          required
                          class="mx-4"
                          prepend-icon="mdi-account-circle"
                          outlined
                        />
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          :label="$t('register.o_age')"
                          :placeholder="$t('register.enterage')"
                          class="mx-4"
                          prepend-icon="mdi-lock"
                          outlined
                          required
                        />
                        <v-text-field
                          ref="password"
                          v-model="password"
                          :type="showPassword ? 'text' : 'password'"
                          :label="$t('register.password')"
                          :rules="[() => !!password || $t('register.required')]"
                          :error-messages="errorMessages"
                          class="mx-4"
                          prepend-icon="mdi-lock"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          outlined
                          required
                          @click:append="showPassword = !showPassword"
                        />
                      </v-form>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else-if="n === 2">
                  <v-col class="col-md-12">
                    <v-card class="mx-auto my-12" width="1000" outlined>
                      <v-list-item class="mt-8">
                        <v-list-item-content>
                          <v-list-item-title class="headline">
                            {{ $t("register.o_register") }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ $t("register.o_register2") }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-form>
                        <v-autocomplete
                          ref="governate"
                          v-model="governate"
                          class="mx-4 mt-8"
                          :rules="[
                            () => !!governate || $t('register.required'),
                          ]"
                          :items="govEn"
                          :label="$t('register.governate')"
                          :placeholder="$t('register.select')"
                          outlined
                          required
                        />
                        <v-autocomplete
                          ref="regions"
                          v-model="regions"
                          class="mx-4"
                          :rules="[() => !!regions || $t('register.required')]"
                          :items="regions"
                          :label="$t('register.region')"
                          :placeholder="$t('register.select')"
                          outlined
                          required
                        />
                        <v-autocomplete
                          ref="faculty"
                          v-model="faculty"
                          class="mx-4"
                          :rules="[() => !!faculty || $t('register.required')]"
                          :items="faculty"
                          :label="$t('register.faculty')"
                          :placeholder="$t('register.select')"
                          outlined
                          required
                        />
                        <v-autocomplete
                          ref="field"
                          v-model="field"
                          class="mx-4"
                          :rules="[() => !!field || $t('register.required')]"
                          :items="field"
                          :label="$t('register.field')"
                          :placeholder="$t('register.select')"
                          outlined
                          required
                        />
                      </v-form>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col class="col-md-12">
                    <v-card class="mx-auto my-12" width="1000" outlined>
                      <v-list-item class="mt-8">
                        <v-list-item-content>
                          <v-list-item-title class="headline">
                            {{ $t("register.o_register") }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ $t("register.o_register3") }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-form>
                        <v-autocomplete
                          ref="experience"
                          v-model="experience"
                          class="mx-4 mt-8"
                          :rules="[
                            () => !!experience || $t('register.required'),
                          ]"
                          :items="[
                            'Skiing',
                            'Ice hockey',
                            'Soccer',
                            'Basketball',
                            'Hockey',
                            'Reading',
                            'Writing',
                            'Coding',
                            'Basejump',
                          ]"
                          :label="$t('register.exp')"
                          :placeholder="$t('register.select')"
                          outlined
                          multiple
                          required
                        />
                        <v-autocomplete
                          ref="speciality"
                          v-model="speciality"
                          class="mx-4"
                          :rules="[
                            () => !!speciality || $t('register.required'),
                          ]"
                          :items="[
                            'Skiing',
                            'Ice hockey',
                            'Soccer',
                            'Basketball',
                            'Hockey',
                            'Reading',
                            'Writing',
                            'Coding',
                            'Basejump',
                          ]"
                          :label="$t('register.epeciality')"
                          :placeholder="$t('register.select')"
                          outlined
                          multiple
                          required
                        />
                      </v-form>
                    </v-card>
                  </v-col>
                </v-row>
                <v-btn v-if="n === 3" color="primary">
                  {{ $t("register.register") }}
                </v-btn>
                <v-btn v-else color="primary" @click="nextStep(n)">
                  {{ $t("register.continue") }}
                </v-btn>

                <v-btn text>
                  <nuxt-link :to="localePath('/welcome')">
                    {{ $t("register.cancel") }}
                  </nuxt-link>
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </template>
        </v-stepper>
        <Nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import AuthService from '../AuthService'
export default {
  components: {},
  data () {
    return {
      govEn: [
        'Alexandria',
        'Aswan',
        'Asyut',
        'Beheira',
        'Beni Suef',
        'Cairo',
        'Dakahlia',
        'Damietta',
        'Faiyum',
        'Gharbia',
        'Giza',
        'Ismailia',
        'Kafr El Sheikh',
        'Luxor',
        'Matruh',
        'Minya',
        'Monufia',
        'New Valley',
        'North Sinai',
        'Port Said',
        'Qalyubia',
        'Qena',
        'Red Sea',
        'Sharqia',
        'Sohag',
        'South Sinai',
        'Suez'
      ],
      showPassword: false,
      e1: 1,
      steps: 3,
      username: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: '',
      msg: ''
    }
  },
  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
    vertical () {
      this.e1 = 2
    }
  },
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  },
  methods: {
    async signUp () {
      try {
        const credentials = {
          name: this.username,
          phone: this.phone,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        const response = await AuthService.signUp(credentials)
        this.msg = response.msg
        const token = response.token
        const user = response.user
        this.$store.dispatch('login', { token, user })

        this.$router.push('/' + this.$i18n.locale + '/')
      } catch (error) {
        this.msg = error.response.data.msg
      }
    },
    onInput (val) {
      this.steps = parseInt(val)
    },
    nextStep (n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$i18n.locale === 'ar' ? 'rtl' : 'ltr'
      }
    }
  }
}
</script>
