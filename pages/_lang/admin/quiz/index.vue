<template>
  <v-app>
    <v-progress-linear v-if="loading" indeterminate color="green" />
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
        {{ $t('btn.cancel') }}
      </v-btn>
    </v-snackbar>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="quiz_title"
            :label="$t('quiz.title')"
            class="mx-4 mt-4"
            :placeholder="$t('quiz.entertitle')"
            :rules="[() => !!quiz_title || $t('register.required')]"
            outlined
            required
          />
        </v-col>

        <v-col cols="12" sm="4">
          <v-select
            v-model="quiz_lang"
            :label="$t('quiz.lang')"
            :items="['ar','en']"
            class="mx-4 mt-4"
            :placeholder="$t('quiz.enterlang')"
            :rules="[() => !!quiz_lang || $t('register.required')]"
            outlined
            required
          />
        </v-col>
        <v-col cols="12" sm="12">
          <v-slider
            v-model="quiz_time"
            :rules="[val => val > 2 || $t('register.required')]"
            color="orange"
            :label="$t('quiz.time')+': '+quiz_time +'  '+$t('quiz.min')"
            min="1"
            max="60"
            class="mx-4 "
            thumb-label
          />
        </v-col>
        <v-col cols="12" sm="12">
          <v-slider
            v-model="quiz_number"
            :rules="[val => val >= 10 || $t('register.required')]"
            color="orange"
            :label="$t('quiz.questionsno')+': '+quiz_number +'  '+$t('quiz.question')"
            min="1"
            max="60"
            class="mx-4 "
            thumb-label
          />
        </v-col>
      </v-row>

      <div class="osahan-area text-center mt-3">
        <v-btn
          color="success"
          class="osahan-area text-center mt-3"
          @click.prevent="addQuiz"
        >
          {{ $t("quiz.save") }}
        </v-btn>
      </div>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="quizzes"
      :search="search"
      sort-by="title"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            :label="$t('table.search')"
            single-line
            hide-details
          />
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.title"
                      :label="$t('quiz.title')"
                      :placeholder="$t('quiz.entertitle')"
                      :rules="[() => !!editedItem.title || $t('register.required')]"
                      outlined
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-select
                      v-model="editedItem.lang"
                      :label="$t('quiz.lang')"
                      :items="['ar','en']"
                      :placeholder="$t('quiz.enterlang')"
                      :rules="[() => !!editedItem.lang || $t('register.required')]"
                      outlined
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-slider
                      v-model="editedItem.time"
                      :rules="[val => val > 2 || $t('register.required')]"
                      color="orange"
                      :label="$t('quiz.time')+' : '+editedItem.time +'  '+$t('quiz.min')"
                      min="1"
                      max="60"
                      thumb-label
                    />
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-slider
                      v-model="editedItem.questions_limit"
                      :rules="[val => val >= 10 || $t('register.required')]"
                      color="orange"
                      :label="$t('quiz.questionsno')+': '+editedItem.questions_limit +'  '+$t('quiz.question')"
                      min="1"
                      max="60"
                      thumb-label
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close">
                {{ $t('btn.cancel') }}
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                {{ $t('btn.save') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!--                            <template v-slot:top>-->
      <!--                                <v-btn class="mr-2" color="primary" dark>Accept-->
      <!--                                    <v-icon dark right>mdi-cloud-upload</v-icon>-->
      <!--                                </v-btn>-->
      <!--                            </template>-->

      <template v-slot:item.actions="{ item }">
        <nuxt-link :to="localePath(`/admin/quiz/${item.slug}/questions`)">
          <!--        <nuxt-link :to="{name:'local-quiz-slug-questions'}">-->
          <v-btn class="mr" color="primary" dark>
            {{ $t('btn.add_questions') }}
            <v-icon dark right>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
        </nuxt-link>

        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-label>{{ $t('tabel.nodata') }}</v-label>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import AuthService from '../../../../AuthService'
export default {
  components: {},
  async fetch ({ store }) {
    await store.dispatch('admin/loadQuizzes')
  },
  data: () => ({
    dialog: false,
    search: '',

    quiz_title: '',
    quiz_time: 10,
    quiz_lang: 'ar',
    quiz_number: 10,
    loading: false,
    scolor: '',
    smode: '',
    colors: ['success', 'info', 'error', 'cyan darken-2'],
    snackbar: false,
    stext: '',
    stimeout: 2000,
    x: null,
    y: 'top',
    data: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      time: 0,
      lang: '',
      question_number: 10,
      questions_limit: 0
    },
    defaultItem: {
      title: '',
      slug: 0,
      time: 0,
      lang: 0,
      questions_limit: 0,
      question_number: 0
    }
  }),
  computed: {
    ...mapState({
      quizzes: state => state.admin.quiz
    }),
    headers () {
      return [

        { text: this.$t('table.title'), value: 'title' },
        // { text: 'slug', value: 'slug' },
        { text: this.$t('table.time'), value: 'time' },
        // { text: 'lang', value: 'lang' },
        // { text: 'questions_limit', value: 'questions_limit' },
        // { text: 'question_number', value: 'question_number' },

        { text: this.$t('table.actions'), value: 'actions', sortable: false }
      ]
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    console.log(this.$route.fullPath)
  },

  created () {
  //  this.allQuiz()

  },

  methods: {
    async addQuiz () {
      //  this.$router.push('/');
      // this.$Progress.start();
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const credentials = {
            title: this.quiz_title,
            time: this.quiz_time,
            lang: this.quiz_lang,
            questions_number: this.quiz_number
          }

          console.log(credentials)

          const response = await AuthService.addQuiz(credentials, this.$auth.getToken('local'))
          this.msg = response.msg
          this.data = response.data
          this.quiz_title = ''
          this.loading = false
          this.snackbar = true
          this.scolor = 'success'
          this.stext = this.$t('success.quiz')
          this.$store.dispatch('admin/loadQuizzes')
        } catch (error) {
          this.msg = error.response.data.msg
          console.log(error.response.data.msg)
          this.loading = false
          this.snackbar = true
          this.scolor = 'error'
          this.stext = this.$t('error.something_wrong')
        }
      }
    },
    async editQuiz () {
      try {
        const credentials = {
          title: this.editedItem.title,
          time: this.editedItem.time,
          lang: this.editedItem.lang,
          questions_number: this.editedItem.questions_limit
        }

        const token = this.$auth.getToken('local')

        const response = await AuthService.editQuiz(
          credentials,
          this.editedItem.slug,
          token
        )
        this.msg = response.msg
        this.data = response.data
        console.log(response.data)
        this.snackbar = true

        this.scolor = 'success'
        this.stext = this.$t('success.quiz_edit')
        this.loading = false
        this.dialog = false
        this.$store.dispatch('admin/loadQuizzes')
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('error.something_wrong')
        this.loading = false
      }
    },
    async deleteQuiz (slug) {
      try {
        const response = await AuthService.deleteQuiz(slug, this.$auth.getToken('local'))
        this.msg = response.msg
        this.data = response.data
        console.log(response.data)
        this.snackbar = true
        this.scolor = 'success'
        this.stext = this.$t('success.quiz_delete')
        this.loading = false
        this.$store.dispatch('admin/loadQuizzes')
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('error.something_wrong')
        this.loading = false
      }
    },
    editItem (item) {
      this.editedIndex = this.quizzes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    questions (item) {
      this.$route.push(this.localePath(`/admin/quiz/${item.slug}`))
    },

    deleteItem (item) {
      confirm(this.$t('btn.sure_delete') + ' ' + item.title + '!') &&
      this.deleteQuiz(item.slug)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        this.editQuiz()
      } else {
        this.quizzes.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
