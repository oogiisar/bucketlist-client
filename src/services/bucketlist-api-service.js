import TokenService from './token-service';
import config from '../config';

const bucketListApiService = {
  getBucketlist(user_id) {
    return fetch(`${config.API_ENDPOINT}/bucketlist/${user_id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  patchItem(user_id, item_id, completed) {
    const body = {
        type: 'item',
        user_id: user_id, 
        item_id: item_id, 
        completed: completed
    }
    return fetch(`${config.API_ENDPOINT}/bucketlist/${user_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  patchTask(user_id, item_id, task_id, completed) {
    const body = {
        type: 'task',
        user_id: user_id,
        item_id: item_id, 
        task_id: task_id,
        completed: completed

    }
    return fetch(`${config.API_ENDPOINT}/bucketlist/${user_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postItem(user_id, item) {
    const body = {
        type: 'item',
        user_id: user_id,
        item_id: '',
        item: item
    }
    return fetch(`${config.API_ENDPOINT}/bucketlist/${user_id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(body),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },
  postTask(user_id, item_id, task) {
    const body = {
        type: 'task',
        item_id: item_id,
        item: task
    }

    return fetch(`${config.API_ENDPOINT}/bucketlist/${user_id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(body),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  }
}

export default bucketListApiService;
