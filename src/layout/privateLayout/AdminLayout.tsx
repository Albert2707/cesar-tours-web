import { Outlet } from 'react-router-dom'
import NavbarAdmin from './components/NavbarAdmin'
import './AdminLayout.scss'
import { useAuth } from '../../context/authContext';
import { AuthTypes } from '../../context/authTypes';
import Footer from '../../features/footer/Footer';
const AdminLayout = () => {
  const { currentUser } = useAuth() as AuthTypes;
  return (
    <>
      <NavbarAdmin />
      <div className="wrapper-layout">
        <h3>
          Bienvenido, {currentUser.name} 👋
        </h3>
        <Outlet />
      </div>
      <Footer />
    </>)
}

export default AdminLayout