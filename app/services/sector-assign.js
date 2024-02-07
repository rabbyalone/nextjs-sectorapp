const baseURL = "https://sectorapp.azurewebsites.net"

export const getItems = async () => {
    const response = await fetch(baseURL + '/api/sector-assign', {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    return response.json();
};

export const getItemsById = async (id) => {
    const response = await fetch(baseURL + '/api/sector-assign/' + id, {
    });

    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    return response.json();
};



export const createItem = async (data) => {
    const response = await fetch(baseURL + '/api/sector-assign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create item');
    }

    return response.json();
};


export const updateItem = async (id, data) => {
    const response = await fetch(`${baseURL}/api/sector-assign?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update item');
    }
};


export const deleteItem = async (id) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete item');
    }
};
