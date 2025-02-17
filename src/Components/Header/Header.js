import { Container, Dropdown, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/Auth';

function Header1() {
  const { isAuth, handleLogout } = useAuthContext()

  return (
    <Navbar expand="lg" className="p-3" style={{backgroundColor:"#2C5364"}}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Link className='text-light nav-link mx-3 ' to="/add">Add Rider</Link>
          <Link className='text-light nav-link mx-3 ' to="/boking">Boking</Link>
          <NavDropdown title="Delivery" className='text-light mx-3' id="basic-nav-dropdown">
            <Link className='text-dark nav-link  text-center  my-2 p-1 ' to="/make-delivery"> Make Sheet</Link>
            <hr />
            <Link className='text-dark nav-link  text-center my-2 p-1 ' to="/view-sheet">View Sheet</Link>
            <hr />
            <Link className='text-dark nav-link  text-center my-2 p-1 ' to='/showData'>Update Sheet</Link>
          </NavDropdown>
          <Link className='text-light nav-link mx-3 ' to="/track-shipment">Track Shipment</Link>
          <NavDropdown title="Account" className=' text-light d-flex mb-1 ms-3 flex-wrap ' id="basic-nav-dropdown">
            {!isAuth
              ? <>
                <Dropdown.Item as={"div"}>
                  <Link className='ms-4 nav-link text-dark' to="/auth/login">Login</Link>
                </Dropdown.Item>
                <Dropdown.Item as={"div"}>
                  <Link className='ms-4 nav-link  text-dark' to="/auth/register">Register</Link>
                </Dropdown.Item>
              </>
              : <>
                {/* <Dropdown.Item as={"div"}>
                  <Link className='ms-4 nav-link  text-dark' to="/todos/myTodos">My Notes</Link>
                </Dropdown.Item> */}
                <Dropdown.Item as={"div"}>
                  <Link className='ms-4 nav-link  text-dark' onClick={handleLogout} >Logout</Link>
                </Dropdown.Item>
              </>
            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header1;