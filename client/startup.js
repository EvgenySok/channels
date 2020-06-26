import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn } from './redux/reducers/loginActions'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.loginReducer.token)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
    }
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Startup