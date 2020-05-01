<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      app
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img :src=" this.$auth.user.image ">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ this.$auth.user.name_en }}</v-list-item-title>
            <v-list-item-subtitle>{{ this.$auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item link>
          <v-list-item-icon>
            <v-icon />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="localePath('/quiz')">
                {{ $t('drawer.quiz') }}
              </nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('drawer.questions') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('drawer.students') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('drawer.groups') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :color="color" dark :elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ $t('home.title') }}{{ ' '+this.$auth.user.name_ar }}</v-toolbar-title>
      <v-spacer />

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <v-btn
            color="error"
            dark
            :elevation="0"
          >
            {{ $t('golive') }}
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="this.$auth.user.image " :alt="this.$auth.user.name_en">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ this.$auth.user.name_en }}</v-list-item-title>
                <v-list-item-subtitle>{{ this.$auth.user.email }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ this.$auth.user.phone }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action />
            </v-list-item>
          </v-list>

          <v-divider />

          <v-card-actions>
            <v-spacer />

            <v-btn text @click="logout">
              {{ $t('btn.logout') }}
            </v-btn>
            <v-btn color="" text>
              <nuxt-link :to="localePath('/profile')">
                {{ $t('ostaz.profile') }}
              </nuxt-link>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      color: 'blue',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: false,
      permanent: false,
      miniVariant: true,
      expandOnHover: true,
      background: false
    }
  },
  computed: {
    bg () {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    }
  },
  created () {
    this.right = this.$i18n.locale === 'ar'
  },
  methods: {
    logout () {
      this.$auth.logout()
    }

  }
}
</script>
