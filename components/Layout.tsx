import Header from './common/Header'
import Footer from './common/Footer'
 
export default function Layout({ children }:any) {
  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      {/* <Footer /> */}
    </>
  )
} 