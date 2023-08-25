import { useEffect, useState } from 'react';
let online;
const useOnline = (funcObj) => {

    if (navigator.onLine) {
        online = true;
    }
    else {
        online = false;
    }

    const [isOnline, setIsOnline] = useState(online);

    useEffect(() => {
        const offlineEventListenerFunction = () => {
            setIsOnline(false);
            funcObj?.offline?.map(e => e());
        };

        const onlineEventListenerFunction = () => {
            setIsOnline(true);
            funcObj?.online?.map(e => e());
        };

        addEventListener('offline', offlineEventListenerFunction);
        addEventListener('online', onlineEventListenerFunction);

        return () => {
            removeEventListener('offline', offlineEventListenerFunction);
            removeEventListener('online', onlineEventListenerFunction);
        }
    }, [])
    return isOnline;
}

export default useOnline;

