import Container from 'react-bootstrap/Container';
import { ToolBar, ToolBarInterface } from '../components/ToolBar';

interface AppLayout extends ToolBarInterface{
    children: JSX.Element | JSX.Element[];
    showSidebar: boolean;
}

export const AppLayout = ({
    children,
    showSidebar,
    onLogout
}: AppLayout) => {
  return (
    <div className="min-vh-100">
        <div className="header">
            {
                showSidebar &&
                <ToolBar 
                    onLogout={onLogout}
                />
            }
        </div>
        <div className="main-content py-5">
            <Container >
                { children }
            </Container>
        </div>
    </div>
  )
}
