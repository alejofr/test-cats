import { render, screen } from "@testing-library/react";
import { CardThumbnailImage } from "../../src/components";


describe('Pruebas en <CardThumbnailImage />', () => {

    test('debe de mostrar la imagen con el URL', () => {

        const urlImg = "https://cdn2.thecatapi.com/images/36v.jpg"; 
        
        render( <CardThumbnailImage urlImage={urlImg} /> );
        // screen.debug();
        
        const Image = screen.getByRole('img') as HTMLImageElement;

        expect( Image.src ).toBe( urlImg );
    
    });

})