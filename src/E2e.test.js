import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

test('That menu page get loaded', () => {
    render(<App />, {wrapper: MemoryRouter})

    // verify page content for expected route
    expect(screen.getByText(/Tic tac toe/i)).toBeInTheDocument()
    expect(screen.getByText(/menu/i)).toBeInTheDocument()
})

test('That history page get loaded', async () => {
    localStorage.setItem('gamesHistory', '[{"datetime":1648555215534,"gameMode":"pvp","squaresSetups":["X","O","X",null,"O",null,null,null,null]}]')
    render(<App/>, {wrapper: MemoryRouter})

    userEvent.click(screen.getByText('History'));

    const items = await screen.findByText(/Game result/)
    expect(items).toBeInTheDocument();
    localStorage.clear();
})

test('That game page get loaded', async () => {
    render(<App/>, {wrapper: MemoryRouter})

    userEvent.click(screen.getByText('2 Players'));

    const items = await screen.findByText(/start a new game/)
    expect(items).toBeInTheDocument();
})
