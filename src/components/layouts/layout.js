import GlNavbar from '../glNavBar'

export default function Layout({ children }) {
  return (
    <>
      <GlNavbar />
      <main>{children}</main>
    </>
  )
}