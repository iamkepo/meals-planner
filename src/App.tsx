import EmptyLayout from './layouts/EmptyLayout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import ConfigLayout from './layouts/ConfigLayout'
import FilterLayout from './layouts/FilterLayout'
import NavLayout from './layouts/NavLayout'

import LandingView from './views/LandingView'
import HomeView from './views/HomeView'
import PricingView from './views/PricingView'
import SuscribeView from './views/SuscribeView'
import NoMatchView  from './views/NoMatchView'
import CategoryView from './views/CategoryView'
import CartView from './views/CartView'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route index element={<NoMatchView />} />

          <Route path=":lang/" element={<NavLayout />}>
            <Route index element={<LandingView />} />
            <Route path='cart' element={<CartView />} />

            <Route path='category/' element={<FilterLayout />}>
              <Route index element={<HomeView />} />
              <Route path=':id' element={<CategoryView />} />
            </Route>

            <Route path='config/' element={<ConfigLayout />}>
              <Route index element={<PricingView />} />
              <Route path='suscribe' element={<SuscribeView />} />
            </Route>

            <Route path='*' element={<NoMatchView />} /> 
          </Route>      
        </Route>
      </Routes>
    </Router>
  )
}

export default App
