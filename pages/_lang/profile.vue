<template>
  <v-app>
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
        {{ $t("btn.cancel") }}
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col class="col-md-12">
        <v-list-item class="mt-8">
          <v-list-item-avatar color="grey" />
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ $t("update.o_login") }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t("update.o_sublogin") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="nameAr"
            :label="$t('update.o_name')"
            class="mx-4 mt-8"
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="nameEn"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="email"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="phone"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="addressAr"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="addressEn"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />
          <v-text-field
            v-model="gender"
            :label="$t('update.o_name')"
            class="mx-4 "
            :placeholder="$t('update.entermp')"
            prepend-icon="mdi-account-circle"
            :rules="emailRules"
            outlined
            required
          />

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('update.password')"
            class="mx-4"
            prepend-icon="mdi-lock"
            :rules="[() => !!password || $t('update.required')]"
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
            {{ $t("update.login") }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <Nuxt />
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      nameAr: '',
      nameEn: '',
      addressAr: '',
      addressEn: '',
      phone: '',
      email: '',
      gender: '',
      code: ''

    }
  },
  created () {
    this.nameAr = this.$auth.user.name_ar
    this.nameEn = this.$auth.user.name_en
    this.addressAr = this.$auth.user.address_ar
    this.addressEn = this.$auth.user.address_en
    this.phone = this.$auth.user.phone
    this.email = this.$auth.user.email
    this.gender = this.$auth.user.gender
  }

}
</script>
