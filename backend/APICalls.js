
// tried fiddling around with the server numbers, couldn't find one that actually connects.
const server = "http://localhost:3001";

export async function getAllPlayers(){
    try{
        const response = await fetch(`${server}/api/players`);
        const data = await response.json();
        return(data);
    }catch (error) {
        console.error('Error fetching data:', error);
      }
};

export async function updatePlayerLobby(lobby, params){
    try{
        const url = `${server}/api/updatePlayerLobby/${lobby}`;
        const response = await fetch(url, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });
          const updatedPlayer = await response.json();
          return updatedPlayer;
    }catch (error) {
      console.error('Error fetching data:', error);
    }
}

export async function createPlayer(params) {
    try {
        const response = await fetch(`${server}/api/createPlayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });
        const createdPlayer = await response.json();
        return createdPlayer;
    } catch (error) {
        console.error('Error creating player:', error);
    }
}

export async function updatePlayerSore(id, params){
    try{
        const url = `${server}/api/updatePlayerScore/${id}`;
        const response = await fetch(url, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });
        const updatedPlayer = await response.json();
        return updatedPlayer;
    }catch (error){
        console.error('Error fetching data:', error);
    }
}

export async function updateGameRound(id, params){
    try{
        const url = `${server}/api/updateGameRound/${id}`;
        const response = await fetch(url, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });
        const updatedGame = await response.json();
        return updatedGame;
    }catch (error){
        console.error('Error fetching data:', error);
    }
}