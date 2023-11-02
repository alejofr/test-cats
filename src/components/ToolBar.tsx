
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

export interface ToolBarInterface{
    onLogout: () => void;
}

export const ToolBar = ({
    onLogout
}: ToolBarInterface) => {
    
    const [navExpanded, setNavExpanded] = useState(false);

    return (
        <Navbar 
            className='h-100 navbar-dark'
            expand="lg"
            onToggle={(val) => setNavExpanded(val) }
            expanded={navExpanded}
        >
            <Container>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className='d-block link-body-emphasis text-decoration-none p-0 bg-transparent text-white border-0'>
                        <img src="https://scontent-bog1-1.xx.fbcdn.net/v/t39.30808-1/394531878_7435997789767824_321278153453013248_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xvHA3ASpw9QAX9mEKZm&_nc_ht=scontent-bog1-1.xx&oh=00_AfCpMjjpfsCRM0QjWaTgJeEH2-tx406_ckdZQwDdZGztFg&oe=6546C9F5" alt="mdo" width="36" height="36" className="rounded-circle" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item to="/profile" as={Link}>Mi Perfil</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={onLogout}>Salir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                            <Nav.Link to='/cats' as={Link}>
                                Gatos
                            </Nav.Link>
                        
                        <Nav.Link to="/cats/favorites" as={Link}>Favoritos</Nav.Link>
                        <Nav.Link to="/cats/votes" as={Link}>Votos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
