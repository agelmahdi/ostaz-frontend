<template>
  <v-app>
    <v-form>
      <v-text-field
        v-model="quiz_title"
        :label="$t('quiz.title')"
        class="mx-4 mt-8"
        :placeholder="$t('quiz.entertitle')"
        :rules="[() => !!quiz_title || $t('register.required')]"
        outlined
        required
      />
      <v-card-actions class="justify-center">
        <v-btn color="info" @click="addQuiz">
          {{ $t("quiz.save") }}
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="data"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Quiz Title"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.slug" label="Slug" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.time" label="Quiz Time" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lang" label="Quiz Lang" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.questions_limit"
                      label="Questions Limit"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.question_number"
                      label="Question Number"
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
        <nuxt-link :to="localePath(`/quiz/${item.slug}/questions`)">
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
import AuthService from '../../../AuthService'
export default {
  components: {},
  data: () => ({
    dialog: false,
    search: '',

    quiz_title: '',
    quiz_time: '3',
    quiz_lang: 'ar',
    questions_number: '33',

    data: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      slug: 0,
      time: 0,
      lang: 0,
      questions_limit: 0,
      question_number: 0
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
    headers () {
      return [
        // {
        //     text: 'Dessert (100g serving)',
        //     align: 'start',
        //     sortable: false,
        //     value: 'name',
        // },
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
    this.allQuiz()
  },

  methods: {
    async allQuiz () {
      //  this.$router.push('/');
      // this.$Progress.start();
      console.log('allQuiz')

      try {
        const credentials = {
          token: this.$auth.getToken('local'),
          page: '1'
        }
        console.log(credentials.token)
        const response = await AuthService.allQuiz(credentials)
        this.msg = response.msg
        this.data = response.data
        console.log(response)
      } catch (error) {
        this.msg = error.message
        console.log(this.msg)
      }
    },
    async addQuiz () {
      //  this.$router.push('/');
      // this.$Progress.start();

      try {
        const credentials = {
          title: this.quiz_title,
          time: this.quiz_time,
          lang: this.quiz_lang,
          questions_number: this.questions_number
        }

        console.log(credentials)

        const response = await AuthService.addQuiz(credentials, this.$auth.getToken('local'))
        this.msg = response.msg
        this.data = response.data
        this.allQuiz()
      } catch (error) {
        this.msg = error.response.data.msg
        console.log(error.response.data.msg)
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

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    questions (item) {
      this.$route.push(this.localePath(`quiz/${item.slug}`))
    },

    deleteItem (item) {
      const index = this.data.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.data.splice(index, 1)
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
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
