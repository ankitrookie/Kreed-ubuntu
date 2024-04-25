import { BASE_URL } from "@env";

export const doubleTeam = async (roomId, userId1, userId2, userId3, userId4) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/games/double/${roomId}`, {
            method: 'POST',
            body: JSON.stringify({ userId1, userId2, userId3, userId4 }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("SignUp error", error);
    }
};

export const doubleTeamScore = async (gameId, score) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/games/double/scores/${gameId}`, {
            method: 'POST',
            body: JSON.stringify(score),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("SignUp error", error);
    }
}

export const singleTeam = async (roomId, userId1, userId2) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/games/single/${roomId}`, {
            method: 'POST',
            body: JSON.stringify({ userId1, userId2 }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("SignUp error", error);
    }

}


export const singleTeamScore = async (gameId, score) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/games/single/scores/${gameId}`, {
            method: 'POST',
            body: JSON.stringify(score),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("SignUp error", error);
    }
}

export const endRoom = async (roomId) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/endGame/${roomId}`, {
            method: 'POST',
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getRoomScore = async (roomId) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/rooms/games/scores/${roomId}`, {
            method: 'GET',
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const makeCoHost = async (roomId, userId) => {
    try {
        const response = await fetch(`${BASE_URL}/rooms/makeCoHost`, {
            method: 'POST',
            body: JSON.stringify({ roomId, userId }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}