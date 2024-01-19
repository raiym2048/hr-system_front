import { Outlet } from 'react-router-dom'
import { ReactElement, useEffect } from 'react'
import Navbar from './components/layout/Navbar/Navbar'
import registerService from './services/registration'
import NavigationMenu from './components/layout/NavigationMenu'
import { initSocket } from './services/socket'
import { getUnreadMessagesCount } from './redux/slice/chatSlice'
import { useAppDispatch } from './redux/store/store'

type Props = {
  errorOutlet: undefined | ReactElement
}

const App = ({ errorOutlet }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    registerService.setUser()
    dispatch(getUnreadMessagesCount())
    if (registerService.user) initSocket(dispatch)
  }, [dispatch])

  return (
    <div className={'app'}>
      <Navbar />
      <NavigationMenu />
      <div>{errorOutlet ? errorOutlet : <Outlet />}</div>
    </div>
  )
}

export default App
