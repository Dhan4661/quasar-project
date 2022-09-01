import { render,screen } from '@testing-library/vue';
import Input from '../QInputWithValidation.vue';
//import userEvent from '@testing-library/user-event';

//props testing
it('input props test', () => {
    render(Input, {
        props: {
            name: 'email',
            id:'email',
        }
    });
    const emailInput = screen.getByTestId('email')
    //console.log(input);
    if(emailInput)
    expect(emailInput.id).toBe('email');

});

// it('input email required', () => {
//     const { container } = render(Input, {
//         props: {
//             name: 'email',
//             required: true,
//             label:'Email',
//             id:'email',
//             isShowPasswordIcon: 'true'
//             // dataTestid:'Email',
//         }
//     });
//     //const emailId = getByTestId('email');

//     const emailInput = container.querySelector('input');
//     //const emailLabel = container.querySelector('label');
//     const emailRequired = container.querySelector('span');
//     // not working for true

//     expect(emailInput.id).toBe('email');
//     // expect(emailInput.dataTestid).toBe("Email");              // failing as dataTestid is not a prop here
//     //expect(emailLabel.label).toBe("Email");
//     //expect(emailRequired.required).toBe("true");
// });

// it('Emitter test', async()=>{
//     const { container, emitted } =  render(Input)
//     const el = container.querySelector('input');
//     await userEvent.type(el, 'abcd');
//     expect(emitted()).toHaveProperty('input');
//     expect(emitted()).toHaveProperty('click');
// })
