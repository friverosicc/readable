const BASE_URL = 'http://localhost:3001/'

const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type !== 'API')
    return next(action)

  let token = localStorage.token 
  if (!token)                    
    token = localStorage.token = Math.random().toString(36).substr(-8)

  const headers = {              
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token       
  }   
  const { payload } = action
  const { url, method, body } = payload
  const notify = data => {
    if ((typeof action.payload.SUCCESS) === 'string')
      dispatch({ type: action.payload.SUCCESS, data })
    else
      action.payload.SUCCESS.map(nextAction => dispatch({ ...nextAction, data }))
  }


  fetch(BASE_URL + url, {
    method,
    headers,
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(notify)
}

export default apiMiddleware
