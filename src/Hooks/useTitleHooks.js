import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Lens`;
    }, [title]);
};

export default useTitle;
