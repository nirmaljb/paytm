import { Outlet, Link } from "react-router-dom"
import { RecoilRoot } from "recoil"
function App() {

  return (
    <RecoilRoot>
      <nav>
          <ul>
            <li>
              <Link to={`signup`}>Sign up</Link>
            </li>
            <li>
              <Link to={`login`}>Login</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
    </RecoilRoot>
  )
}

export default App
