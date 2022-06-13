import GlNavbar from '../glNavBar'

export default function Layout({ children, user, isLoggedIn, handleLogin }) {

  return (
    <>
      <GlNavbar isLoggedIn={ isLoggedIn } user={ user } handleLogin={ handleLogin } />
      <main>{children}</main>
    </>
  )
}