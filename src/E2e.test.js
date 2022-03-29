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


/*
test('that tictactoe header is present', () => {
    render(<HashRouter><App/></HashRouter>);
    const linkElement = screen.getByText(/Tic tac toe/i);
    expect(linkElement).toBeInTheDocument();
});

test('that main page is menu', () => {
    render(<HashRouter><App/></HashRouter>);
    const linkElement = screen.getByText(/menu/i);
    expect(linkElement).toBeInTheDocument();
});

test('that game page can load', async () => {
    render(<HashRouter><App/></HashRouter>);
    // Click button
    fireEvent.click(screen.getByText('2 Players'))

    const items = await screen.findByText(/start a new game/)
    expect(items).toBeInTheDocument();
});

test('that history page contain can load', async () => {
    delete window.location;
    window.location = new URL('http://localhost:3000/');

    render(<HashRouter><App/></HashRouter>);
    // Click button
    userEvent.click(screen.getByText('History'))

    // Wait for page to update with query text
    const items = await screen.findByText(/Game result/)
    expect(items).toBeInTheDocument();

});

*/
