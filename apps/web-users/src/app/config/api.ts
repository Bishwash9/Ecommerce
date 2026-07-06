const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
    const token = localStorage.getItem('accesstoken');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
    };

    if(token && !endpoint.includes('login') && !endpoint.includes('register')){
        headers.Authorization = `Bearer ${token}`;
    }

    //force credentials to include http only cookies for refresh token
    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: 'include'
    };

    const url = `${BASE_URL}${endpoint}`;

    try {


        const response = await fetch(url, fetchOptions);

        //handle access token expiration
        if (response.status === 401 && !endpoint.includes('login')) {
            console.log('Access token expired, attempting to refresh...');


            //call the refresh token endpoint to get new access token
            try {
                const refreshResponse = await fetch(`${BASE_URL}/users/refresh-token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', //ensures cookies are sent with the request
                });

                if (refreshResponse.ok) {
                    const refreshData = await refreshResponse.json();
                    const newAccessToken = refreshData.data.accessToken;

                    //store the new access token in local storage
                    localStorage.setItem('accessToken', newAccessToken);

                    //update the authorizatoin header
                    headers.Authorization = `Bearer ${newAccessToken}`;

                    //retry original request with new access token
                    const retryResponse = await fetch(url, { ...fetchOptions, headers });

                    if (!retryResponse.ok) {
                        const errorData = await retryResponse.json();
                        throw new Error(errorData.message || 'API request failed after token refresh');
                    }

                    return await retryResponse.json();
                } else {
                    //refresh token is also invalid then
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = '/'; //redirect to login page
                    throw new Error('Session expired. Please log in again.');
                }


            } catch (refreshError) {
                console.error('Refresh Token Error:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/'; //redirect to login page
            }

        }

        //handle other non ok responses
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        //return the response data if all ok
        return await response.json();

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}