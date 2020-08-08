import { useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { trySignIn } from './redux/reducers/loginActions'
import { useTypedSelector } from './redux/configStore'

const Startup: FC<any> = (props) => {
  const dispatch = useDispatch()
  const token = useTypedSelector((s) => s.loginReducer.token)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
      // dispatch(tryGetUserInfo())
    }
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Startup
