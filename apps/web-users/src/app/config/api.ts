const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:50001/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {

    const headers : Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {})
    };

    const fetchOptions : RequestInit = {
         ...options,
            headers,
            credentials: 'include' //crucial to send and recieve http only cookies 
    }

    const url = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, fetchOptions);

        const isAuthRequest = 
               endpoint.includes('login') ||
                endpoint.includes('register') ||
                endpoint.includes('refresh-token');

        //handle access token expiration
        if(response.status === 401 && !isAuthRequest) {
            const refreshResponse = await fetch (`${BASE_URL}/users/refresh-token`, {
                method: 'POST',
                credentials: 'include', //ensures cookies are sent with the request
            });

              if(!refreshResponse.ok) {
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;

                throw new Error('Session expired. Please log in again.');
            }

            //after backend replaces both Http only cookies
            //retry original request
            const retryResponse = await fetch(url, fetchOptions);
            
            if(!retryResponse.ok) {
                const errorData = await retryResponse.json();
                throw new Error(errorData.message || 'API request failed after token refresh');
            }

            return await retryResponse.json();
        }

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }

        return await response.json();

    
}