
const baseURL = "http://localhost:5234"

export const getSectors = async () => {
    const response = await fetch(baseURL + '/api/Sectors');

    if (!response.ok) {
        throw new Error('Failed to fetch Sectors');
    }

    return response.json();
};



export const createSector = async (data) => {
    const response = await fetch('/api/Sectors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create Sector');
    }

    return response.json();
};


export const updateSector = async (id, data) => {
    const response = await fetch(`/api/Sectors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update Sector');
    }
};


export const deleteSector = async (id) => {
    const response = await fetch(`/api/Sectors/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete Sector');
    }
};