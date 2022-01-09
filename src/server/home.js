import url from './urls'

export default class Home {
  static getUserMess(params) {
    return $http.post(url.getUserMess, params)
  }
}
