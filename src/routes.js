import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import DashboardPage from 'pages/DashboardPage'
import NotFoundPage from 'pages/NotFoundPage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  '/login': {
    component: loadable(() => import('pages/LoginPage')),
  },
  '/register': {
    component: loadable(() => import('pages/RegisterPage')),
  },
  '/forgot': {
    component: loadable(() => import('pages/ForgotPage')),
  },
  '/dashboard': {
    component: loadable(() => import('pages/DashboardPage')),
  },
  '/tv/:id': {
    component: loadable(() => import('pages/TVSeriesPage')),
  },
  '/movie/:id': {
    component: loadable(() => import('pages/MoviePage')),
  }
}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path="/"  component={DashboardPage}/>
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
