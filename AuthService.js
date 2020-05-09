import axios from 'axios'
const url = '/'

export default {
  login (credentials) {
    return axios.post(url + 'api/streamer/login', credentials).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  signUp (credentials) {
    return axios.post(url + 'api/streamer/register', credentials).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  allQuiz (credentials) {
    return axios.get(url + 'api/streamer/quiz' + '?page=' +
    credentials.page +
    '&P=100',
    {
      headers: {
        Authorization: credentials.token
      }

    }).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  addQuiz (credentials, token) {
    return axios.post(url + 'api/streamer/create_quiz', credentials, {
      headers: {
        Authorization: token
      }

    }).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  editQuiz (credentials, slug, token) {
    return axios
      .put(url + 'api/streamer/quiz/' + `${slug}`, credentials, {
        headers: {
          Authorization: token
        }

      })
      .then(
        response => response.data,
        (error) => {
          console.error(error)
        }
      )
  },
  deleteQuiz (slug, token) {
    return axios.delete(url + 'api/streamer/quiz/' + `${slug}`, {
      headers: {
        Authorization: token
      }

    }).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  allQuestions (credentials, slug, token) {
    const base =
      'api/streamer/' +
      `${slug}` +
      '/question' +
      '?page=' +
      credentials.page +
      '&P=100'
    return axios.get(url + base, {
      headers: {
        Authorization: token
      }

    }).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  addQuestion (credentials, slug, token) {
    return axios
      .post(url + 'api/streamer/' + `${slug}` + '/create_question', credentials, {
        headers: {
          Authorization: token
        }

      })
      .then(
        response => response.data,
        (error) => {
          console.error(error)
        }
      )
  },
  editQuestion (credentials, slug, token) {
    return axios
      .put(url + 'api/streamer/question/' + `${slug}`, credentials, {
        headers: {
          Authorization: token
        }

      })
      .then(
        response => response.data,
        (error) => {
          console.error(error)
        }
      )
  },
  deleteQuestion (slug, token) {
    return axios.delete(url + 'api/streamer/question/' + `${slug}`, {
      headers: {
        Authorization: token
      }

    }).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  }

  // ---------------------------Student------------------------------
  //
  // studentLogin () {
  //   return axios.post(url + 'api/follower/login', credentials).then(
  //     response => response.data,
  //     (error) => {
  //       console.error(error)
  //     })
  // },
  // studentRegister () {
  //   return axios.post(url + 'api/follower/register', credentials).then(
  //     response => response.data,
  //     (error) => {
  //       console.error(error)
  //     })
  // }
}
