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
  allQuestions (credentials, slug) {
    console.log('slug:' + slug)

    const base =
      'api/streamer/' +
      `${slug}` +
      '/question' +
      '?page=' +
      credentials.page +
      '&P=100'
    return axios.get(url + base, credentials).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  },
  addQuestion (credentials, slug) {
    return axios
      .post(url + 'api/streamer/' + `${slug}` + '/create_question', credentials)
      .then(
        response => response.data,
        (error) => {
          console.error(error)
        }
      )
  },
  editQuestion (credentials, slug) {
    return axios
      .put(url + 'api/streamer/question/' + `${slug}`, credentials)
      .then(
        response => response.data,
        (error) => {
          console.error(error)
        }
      )
  },
  deleteQuestion (slug) {
    return axios.delete(url + 'api/streamer/question/' + `${slug}`).then(
      response => response.data,
      (error) => {
        console.error(error)
      })
  }
}
