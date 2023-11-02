import { fireEvent, render, screen } from '@testing-library/react';
import FilterCatSearch from '../../src/components/FilterCatSearch';
import { ParamsSearchImages } from '../../src/interfaces/cat';
import { breeds, categories } from '../test-utils';



const formInit: ParamsSearchImages = {
    limit: 10,
    order: 'RANDOM'
}

describe('Pruebas en <FilterCatSearch />', () => {

    test('Debe llamar la funct onChangeForm al cambiar el valor del select categoria y raza.', () => {
        
        const onChangeForm = jest.fn();
        const selectValueCategory = `${categories[0].id}`;
        const selectValueBreed = breeds[0].id;
        
        render(<FilterCatSearch breeds={breeds} categories={categories} formInit={formInit} onChangeForm={ onChangeForm } />);

        const selectCategory = screen.getByTestId('category') as HTMLSelectElement;
        const selectBreed = screen.getByTestId('breed') as HTMLSelectElement;

        // simulacion de seleccion de categoria
        fireEvent.change(selectCategory, {
            target: { value: selectValueCategory },
        })

        // comprobamos si el valor del select category cambio
        expect(selectCategory.value).toBe(selectValueCategory);

        //simulacion de seleccion de breed
        fireEvent.change(selectBreed, {
            target: { value: selectValueBreed },
        })

        expect(selectBreed.value).toBe(selectValueBreed);
        
        // screen.debug();
        expect( onChangeForm ).toHaveBeenCalled();
        expect( onChangeForm ).toHaveBeenCalledTimes(2);
        expect( onChangeForm ).toHaveBeenCalledWith( { ...formInit, category_ids: selectValueCategory, breed_id: selectValueBreed } );

    })

})