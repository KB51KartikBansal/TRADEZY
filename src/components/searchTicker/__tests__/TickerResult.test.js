import '@testing-library/jest-dom';
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AuthState from "../../../context/auth/AuthState";
import DashboardState from "../../../context/dashboard/DashboardState";
import authContext from "../../../context/auth/authContext";
import dashboardContext from "../../../context/dashboard/dashboardContext";
import TickerResult from "../TickerResult";
import { refreshAccessToken } from "../../../utils/refreshAccessToken";
import axios from "axios";
import { ToastContainer } from "react-toastify";

jest.mock('axios');
jest.mock("react-toastify");
jest.mock('../../../utils/logger');
jest.mock('../../../utils/refreshAccessToken');

const mockTickerDetails = {
    tickerName: "Hindustan Unilever",
    tickerId: "HUL",
    tickerNumber: 2,
    tickerType: 'stock'
}
const mockSizeOfWatchlist = 10;

describe('TickerResult component', () => {
    afterEach(() => {
        cleanup();
    });
    
    test('should render correctly', () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={true} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>)
        const toolTip = screen.getByTestId("tooltip");
        expect(toolTip).toBeInTheDocument();
    })
    test('should show add icon if ticker is not present in user\'s watchlist', () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={false} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>)
        const addButton = screen.getByTestId("addToWatchlistButton");
        expect(addButton).toBeInTheDocument();
    })
    test('should show check icon if ticker is present in user\'s watchlist', () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={true} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>)
        const checkIcon = screen.getByTestId("checkButton");
        expect(checkIcon).toBeInTheDocument();
    })
    test('should truncate the tickerName if length > 30', () => {
        const longTickerName = {
            ...mockTickerDetails,
            tickerName: "Reliance Industries Private Limited"
        }
        const truncatedTickerName = "Reliance Industries Private Li..."
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={longTickerName} isPresentInWatchlist={true} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>);
        const tickerName = screen.getByTestId("tickerName");
        expect(tickerName).toHaveTextContent(truncatedTickerName);
    })
    test('should not truncate the tickerName if length <= 30', () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={true} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>);
        const tickerName = screen.getByTestId("tickerName");
        expect(tickerName).toHaveTextContent(mockTickerDetails.tickerName);
    })
    
    test('should not make addToWatchlist api call if watchlist limit exceeds on adding ticker to watchlist', () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={false} sizeOfWatchList={100} />
            </AuthState>
        </DashboardState>);
        const addButton = screen.getByTestId("addToWatchlistButton");
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);
        render(<ToastContainer />)
    })

    test('should throw error if unable to add ticker to watchlist', async () => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={false} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>);
        const addButton = screen.getByTestId("addToWatchlistButton");
        expect(addButton).toBeInTheDocument();

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
        axios.post.mockReturnValue(Promise.reject(errResponse));
        
        fireEvent.click(addButton);
        expect(axios.post).toHaveBeenCalledTimes(1);

    })

    test('should throw error if access token is expired', async() => {
        render(<DashboardState>
            <AuthState>
                <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={false} sizeOfWatchList={mockSizeOfWatchlist} />
            </AuthState>
        </DashboardState>);
        const addButton = screen.getByTestId("addToWatchlistButton");
        expect(addButton).toBeInTheDocument();

        let errResponse = {
            response: {
                data: {
                    errors: [
                        {
                            message: "Error message",
                            code: "INVALID_ACCESS_TOKEN"
                        }
                    ]
                },
                status: 403
            }
        };
        axios.post.mockReturnValue(Promise.reject(errResponse));
        refreshAccessToken.mockResolvedValueOnce(false);

        fireEvent.click(addButton);
        expect(axios.post).toHaveBeenCalledTimes(1);

    })

    test('should return success response if ticker is added to wathclist', async() => {
        render(
            <authContext.Provider
                value={{
                    authState: {
                        user: {
                            userid: 1
                        }
                    }
                }}>
                <dashboardContext.Provider
                    value={{
                        dashboardDispatcher: jest.fn()
                    }}
                >
                    <TickerResult tickerDetalis={mockTickerDetails} isPresentInWatchlist={false} sizeOfWatchList={mockSizeOfWatchlist} />
                </dashboardContext.Provider>
            </authContext.Provider>
        )
        axios.post.mockResolvedValueOnce({
            status: 200
        })

        const addButton = screen.getByTestId("addToWatchlistButton");
        await act(()=>{
            fireEvent.click(addButton);
        })
        expect(axios.post).toHaveBeenCalledTimes(1);

    })
})

