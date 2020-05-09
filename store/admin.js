
export const state = () => ({
  quiz: [],
  questions: [],
  token: ''

})

export const mutations = {
  SET_QUIZ (state, quiz) {
    state.quiz = quiz
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_QUESTIONS (state, question) {
    state.questions = question
  }
}

export const getters = {
  getQuizzes (state) {
    return state.quiz
  }
}

export const actions = {
  async loadQuizzes ({ commit }) {
    const { quizzes: quiz } = await getData('api/streamer/quiz?' +
      'P=100', this.$axios, this.$auth)

    commit('SET_QUIZ', quiz)
  },
  async loadQuestions ({ commit }, { slug }) {
    const base =
    'api/streamer/' +
    `${slug}` +
    '/question' +
    '?P=100'

    const { quizzes: questions } = await getData(base, this.$axios, this.$auth)
    commit('SET_QUESTIONS', questions)
  }

}
export const getData = async function (url, axios, auth) {
  const response = await axios.get(url,
    {
      headers: {
        Authorization: auth.getToken('local')
      }

    }).then(
    response => response.data,
    (error) => {
      console.error(error)
    })
  return {
    quizzes: response.data
  }
}
