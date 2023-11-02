import { memo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Breed, Category, ParamsSearchImages } from '../interfaces';



interface FilterCatSearch{
    breeds:         Breed[];
    categories:     Category[];
    formInit:       ParamsSearchImages;
    onChangeForm: (params: ParamsSearchImages) => void;
}



const FilterCatSearch = ({
    breeds,
    categories,
    formInit,
    onChangeForm
}: FilterCatSearch) => {
    
    const [ form, setForm ] = useState(formInit);

    const onChange = ( value: string, field: keyof ParamsSearchImages ) => {
        setForm({
            ...form,
            [field]: value
        });

        let newForm: ParamsSearchImages = {...form, [field]: value};

        for (let key in newForm) {
            if( newForm[key as keyof ParamsSearchImages] == "undefined" ){
                delete newForm[key as keyof ParamsSearchImages];
            }
        }

        onChangeForm(newForm);
    }
    

    return (
        <Row>
            <Col lg={3} sm={6} className='mb-3'>
                <FloatingLabel controlId="breed" label="Raza" >
                    <Form.Select 
                        aria-label="razas"
                        value={form.breed_id}
                        onChange={ ({ target }) => onChange( target.value, 'breed_id') }
                        data-testid="breed"
                    >   
                        <option value={'undefined'}>Ninguno</option>
                        {
                            breeds.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col lg={3} sm={6} className='mb-3'>
                <FloatingLabel controlId="category" label="Categoria">
                    <Form.Select 
                        aria-label="categorias"
                        name='category'
                        value={form.category_ids}
                        data-testid="category"
                        onChange={ ({ target }) => onChange( target.value, 'category_ids') }
                    >
                        <option value={'undefined'}>Ninguno</option>
                        {
                            categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col lg={3} sm={6} className='mb-3'>
                <FloatingLabel controlId="order" label="Ordernar">
                    <Form.Select 
                        aria-label="ordernar por"
                        value={form.order}
                        onChange={ ({ target }) => onChange( target.value, 'order') }
                    >
                        <option value={'undefined'}>Ninguno</option>
                        <option value="RANDOM">Aleatorio</option>
                        <option value="DESC">Descendiente</option>
                        <option value="ASC">Ascendiente</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col lg={3} sm={6} className='mb-3'>
                <FloatingLabel controlId="limit" label="Mostrar">
                    <Form.Select 
                        aria-label="mostrar"
                        value={form.limit}
                        onChange={ ({ target }) => onChange( target.value, 'limit') }
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
        </Row>
  )
}

export default memo(FilterCatSearch);
