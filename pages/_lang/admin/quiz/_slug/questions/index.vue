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
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="title"
              :error-messages="errors"
              :rules="nameRules"
              :label="$t('question.title')"
              outlined
              required
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="answer1"
              :error-messages="errors"
              :label="$t('question.answer1')"
              :rules="nameRules"

              outlined
              required
            />

            <v-checkbox
              v-model="checked1"
              value="1"
              :label="$t('question.correct')"
              type="checkbox"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="answer2"
              :error-messages="errors"
              :label="$t('question.answer2')"
              :rules="nameRules"

              outlined
              required
            />

            <v-checkbox
              v-model="checked2"
              value="1"
              :label="$t('question.correct')"

              type="checkbox"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="answer3"
              :error-messages="errors"
              :label="$t('question.answer3')"
              :rules="nameRules"

              outlined
              required
            />

            <v-checkbox
              v-model="checked3"
              value="1"
              :label="$t('question.correct')"
              type="checkbox"
            />
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              v-model="answer4"
              :error-messages="errors"
              :label="$t('question.answer4')"
              :rules="nameRules"

              outlined
              required
            />

            <v-checkbox
              v-model="checked4"
              value="1"
              :label="$t('question.correct')"
              type="checkbox"
            />
          </v-col>
        </v-row>
        <div class="osahan-area text-center mt-3">
          <v-btn
            color="success"
            class="osahan-area text-center mt-3"
            @click.prevent="addQuestion"
          >
            {{ $t('question.save') }}
          </v-btn>
        </div>
      </v-container>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="questions"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:item.answers="items">
        <th v-for="item in items.item.answers" :key="item.name">
          <v-chip
            v-if="item.type === 1"
            color="teal"
            class="ma-1"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            {{ item.title }}
          </v-chip>
          <v-chip v-else color="red" class="ma-1" text-color="white">
            <v-avatar left>
              <v-icon>mdi-close-circle</v-icon>
            </v-avatar>
            {{ item.title }}
          </v-chip>
        </th>
      </template>
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
                <v-row v-if="editedItem.answers.length">
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="editedItem.title"
                      :label="$t('question.title')"
                      outlined
                    />
                  </v-col>

                  <v-col
                    v-for="answer in editedItem.answers"
                    :key="answer.name"
                    cols="12"
                    sm="12"
                  >
                    <v-row>
                      <v-text-field v-model="answer.title" label="Answer 1" outlined />

                      <v-checkbox
                        v-if="answer.type===1"
                        v-model="answer.type"

                        value="true"
                        type="checkbox"
                      />
                      <v-checkbox
                        v-else
                        v-model="answer.type"

                        value="true"
                        type="checkbox"
                      />
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text @click="close">
                {{ $t('btn.cancel') }}
              </v-btn>
              <v-btn color="blue darken-1" text @click.prevent="save">
                {{ $t('btn.save') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-label>{{ $t('table.nodata') }} </v-label>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import AuthService from '../../../../../../AuthService'

export default {
  components: {},
  props: ['quiz'],
  async fetch ({ store, params }) {
    await store.dispatch('admin/loadQuestions', { slug: params.slug })
  },
  data: () => ({
    dialog: false,
    valid: false,
    loading: false,
    onlyOnce: false,
    title: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,

    search: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    checked1: '',
    checked2: '',
    checked3: '',
    checked4: '',
    sucess: [],
    data: [],
    meta: [],
    errors: [],
    scolor: '',
    smode: '',
    colors: ['success', 'info', 'error', 'cyan darken-2'],
    snackbar: false,
    stext: '',
    stimeout: 2000,
    x: null,
    y: 'top',
    editedIndex: -1,
    editedItem: {
      title: '',
      slug: '',
      answers: []
    },
    defaultItem: {
      title: '',
      answers: []
    }
  }),
  computed: {
    ...mapState({
      questions: state => state.admin.questions
    }),
    nameRules () {
      return [
        v => !!v || this.$t('register.required')
      ]
    },
    headers () {
      return [
        { text: this.$t('table.title'), value: 'title' },
        { text: this.$t('table.answers'), value: 'answers' },
        { text: this.$t('table.actions'), value: 'actions', sortable: false }
      ]
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    pagination: {
      get () {
        return this.$store.getters.pagination
      },
      set (value) {
        this.$store.commit('setPagination', value)
      }
    },
    items () {
      return this.$store.getters.items
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },

    pagination: {
      handler () {
        this.loading = true
        this.$store.dispatch('queryItems')
      },
      deep: true
    }
  },
  mounted () {
    console.log(this.$route.params.slug)
  },

  created () {
    // this.allQuestions()
  },

  methods: {
    // next (page) {
    //
    //     this.page =page;
    //    // this.allQuestions();
    //
    // },
    async allQuestions () {
      //  this.$router.push('/');
      // this.$Progress.start();
      this.loading = true
      try {
        const credentials = {
          P: '100',
          page: this.page
        }
        const token = this.$auth.getToken('local')
        // this.$router.push({ path: '/'+this.quiz+'/questions', query: { page: credentials.page }});

        const response = await AuthService.allQuestions(credentials, this.$route.params.slug, token)
        this.msg = response.msg
        this.data = response.data
        this.meta = response.meta
        console.log(response.meta)
        this.loading = false
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('error.something_wrong')
        this.loading = false
      }
    },
    async addQuestion () {
      //  this.$router.push('/');
      // this.$Progress.start();
      // const credentialss = {
      //     title: this.title,
      //     answers: this.answers
      // };
      // console.log(credentialss);

      if (!this.$refs.form.validate()) {

      } else if (
        !this.checked1 &&
        !this.checked2 &&
        !this.checked3 &&
        !this.checked4
      ) {
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('question.check_one')
      } else {
        try {
          const answers = [
            { title: this.answer1, type: this.checked1 ? 1 : 0 },
            { title: this.answer2, type: this.checked2 ? 1 : 0 },
            { title: this.answer3, type: this.checked3 ? 1 : 0 },
            { title: this.answer4, type: this.checked4 ? 1 : 0 }
          ]

          const credentials = {
            title: this.title,
            answers: JSON.stringify(answers)
          }
          console.log(credentials)

          const response = await AuthService.addQuestion(credentials, this.$route.params.slug, this.$auth.getToken('local'))
          this.msg = response.msg
          this.data = response.data
          console.log(response.data)
          // this.sucess.push('Question successfully saved');

          this.snackbar = true
          this.scolor = 'success'
          this.stext = this.$t('success.question')
          this.$store.dispatch('admin/loadQuestions', { slug: this.$route.params.slug })
        } catch (error) {
          this.msg = error.response.data.msg
          console.log(error.response.data.msg)

          this.snackbar = true
          this.scolor = 'error'
          this.stext = this.$t('error.something_wrong')
          this.loading = false
        }
      }
    },
    async editQuestion () {
      try {
        const credentials = {
          title: this.editedItem.title,
          answers: JSON.stringify(this.editedItem.answers)
        }
        console.log(credentials)
        console.log(this.editedItem.slug)
        const token = this.$auth.getToken('local')

        const response = await AuthService.editQuestion(
          credentials,
          this.editedItem.slug,
          token
        )
        this.msg = response.msg
        this.data = response.data
        this.snackbar = true
        this.scolor = 'success'
        this.stext = this.$t('success.question_edit')
        this.$store.dispatch('admin/loadQuestions', { slug: this.$route.params.slug })
        this.dialog = false
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('error.something_wrong')
        this.loading = false
      }
    },
    async deleteQuestion (slug) {
      try {
        const response = await AuthService.deleteQuestion(slug, this.$auth.getToken('local'))
        this.msg = response.msg
        this.data = response.data
        this.snackbar = true
        this.scolor = 'success'
        this.stext = this.$t('success.question_delete')
        this.$store.dispatch('admin/loadQuestions', { slug: this.$route.params.slug })
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
        this.snackbar = true
        this.scolor = 'error'
        this.stext = this.$t('error.something_wrong')
        this.loading = false
      }
    },

    initialize () {
      this.data = [
        {
          title: '',
          slug: '',
          time: '',
          lang: '',
          questions_limit: '',
          question_number: ''
        }
      ]
    },
    checkForm (e) {
      if (
        this.title &&
        this.answer1 &&
        this.answer2 &&
        this.answer2 &&
        this.answer3 &&
        this.answer4
      ) {
        if (this.checked1 || !this.checked2 || this.checked3 || this.checked4) {
          return true
        }
      }

      this.errors = []

      if (!this.title) {
        this.errors.push('title required.')
      }

      if (!this.answer1) {
        this.errors.push('answer1 required.')
      }
      if (!this.answer2) {
        this.errors.push('answer2 required.')
      }
      if (!this.answer3) {
        this.errors.push('answer3 required.')
      }
      if (!this.answer4) {
        this.errors.push('answer4 required.')
      }
      if (
        !this.checked1 &&
        !this.checked2 &&
        !this.checked3 &&
        !this.checked4
      ) {
        this.errors.push('at least one correct answer checked.')
      }

      e.preventDefault()
    },
    editItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm(this.$t('btn.sure_delete') + ' ' + item.title + '!') &&
        this.deleteQuestion(item.slug)
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
        this.editQuestion()
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
