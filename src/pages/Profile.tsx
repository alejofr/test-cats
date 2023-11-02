import Card from 'react-bootstrap/Card';

import { useAppSelector } from '../store'

export const Profile = () => {
    const user = useAppSelector(state => state.auth.user);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100'>
            <Card style={{ width: '24rem' }}>
                <Card.Body>
                    <Card.Title>{ user!.names } { user!.surnames }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ user!.email  }</Card.Subtitle>
                    <Card.Text>
                        ¡Bienvenido a mi prueba!, soy de Venezuela, estado Lara. Tengo 25 años, y 4 años de experiencia como desarrollador...
                    </Card.Text>
                    <Card.Link  target='_blank' href="https://wa.link/tbl9c6">Link WhatsApp</Card.Link>
                    <Card.Link target='_blank' href="https://github.com/alejofr/test-cats">Link de repositorio</Card.Link>
                </Card.Body>
            </Card>
        </div>
  )
}
