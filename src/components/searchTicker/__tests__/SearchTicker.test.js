import { render,screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchTicker from '../SearchTicker';
import userEvent from "@testing-library/user-event";
import AuthState from "../../../context/auth/AuthState";
import DashboardState from "../../../context/dashboard/DashboardState";
import axios from "axios";

jest.mock('axios');
jest.mock("react-toastify");
jest.mock('../../../utils/logger');

describe('In SearchTicker Component ', () => {
    afterEach(() => {
        cleanup();
    });
    beforeEach(()=>{
        let errResponse = {
            response: {
                data: {
                    errors: [
                        {
                            message: "some error occured",
                            code: "NOT_FOUND"
                        }
                    ]
                },
                status: 400
            }
        };
     
        axios.get.mockReturnValue(Promise.reject(errResponse));
        render(
            <DashboardState>
                <AuthState>
                    <SearchTicker userId={1}/>
                </AuthState>
            </DashboardState>  
        )
        
    })
    
    test('Input box should render correctly ', () => {
        let inputBox=screen.getByRole('searchbox')
        expect(inputBox).toBeInTheDocument()
    })
    test('Input box should initially be empty', () => {
        let inputBox=screen.getByRole('searchbox')
        expect(inputBox).toHaveValue('')
    })
    test('Input box\'s content should change as user types something', () => {
        let inputBox=screen.getByRole('searchbox')
        userEvent.type(inputBox, 'sample stock')
        expect(inputBox).toHaveValue('sample stock')
    })
})