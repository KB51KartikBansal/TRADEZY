import { render,screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import DashboardState from "../../../context/dashboard/DashboardState"
import SearchResults from "../SearchResults"
import AuthState from "../../../context/auth/AuthState";
import axios from "axios";
import dashboardContext from "../../../context/dashboard/dashboardContext";
import { searchTickerURL } from "../../../config/urlConstants";
import { act } from "react-dom/test-utils";

jest.mock("axios")

const SearchResultsPage = (tickerNumber)=>{
    return(
        <AuthState>
            <dashboardContext.Provider
                value={{
                    dashboardState : {
                        watchlist: [{
                            tickerNumber: Number(tickerNumber),
                            tickerName: 'Hindustan Unilever',
                            tickerId: "HUL"
                        }],
                    },
                    dashboardDispatcher: jest.fn()
                }}
                >
                <SearchResults query={"Hindustan Unilever"}/>
            </dashboardContext.Provider>
        </AuthState>
    )
}
describe('SearchResults component', () => {
    let error = {
        status: 404,
        code: "NO_DATA_FOUND",
        message: "No data found",
    }
    test('should render correctly before fetching search results', async()=>{
        await act(()=>{
            render(
                <AuthState>
                    <DashboardState>
                        <SearchResults query={"Hindustan Unilever Stock"}/>
                    </DashboardState>
                </AuthState>
            )
        })
        const searchingElement = screen.getByText(/searching/i)
        expect(searchingElement).toBeInTheDocument()

        await act(async()=>{
            await new Promise((r) => setTimeout(r, 900)); 
        })

        const noMatchFoundElement = screen.getByText(/no match found for/i)
        expect(noMatchFoundElement).toBeInTheDocument()

    })

    test('should render correctly when match found', async() => {
        //given
        axios.get.mockResolvedValueOnce(
            { 
                data: [{
                    tickerName: "Hindustan Unilever",
                    tickerId: "HUL",
                    tickerNumber: 2,
                    tickerType: "stock"
                }]
            }
        )
        await act (()=>{
            render(SearchResultsPage(2))
        })

        await act(async()=>{
            await new Promise((r) => setTimeout(r, 900)); 
        })
        let query = "Hindustan Unilever";
        let config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true ,
              "Access-Control-Allow-Headers": '*',
              
            },
            mode:"cors"
          };
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`${searchTickerURL}/${query.toString()}`, config);
    })

    test('should throw error if ticker is not found', async()=>{
        axios.get.mockRejectedValue(()=>{
            throw error;
        })
        act(()=>{
            render(SearchResultsPage(2))
        })
        await act(async()=>{
            await new Promise((r) => setTimeout(r, 900)); 
        }) 
        expect(axios.get).toHaveBeenCalledTimes(1);

    })

    test('should return false if ticker number is not found in watchlist', async()=>{
        axios.get.mockResolvedValue(
            { 
                data: [{
                    tickerName: "Hindustan Unilever",
                    tickerId: "HUL",
                    tickerNumber: 2,
                    tickerType: "stock"
                }]
            }
        )
        act(()=>{
            render(SearchResultsPage(1))
        })
        await act(async()=>{
            await new Promise((r) => setTimeout(r, 900)); 
        }) 
        expect(axios.get).toHaveBeenCalledTimes(1);
    })    
})