export const leafFunction = {

    switchPage: (route = 'forward', currentPage, dispatch, method) => {
        const pages = [];

        if (currentPage >= 5 && currentPage % 5 === 0) {

            if (route === 'back') {
                for (let i = currentPage - 5; i <= currentPage; i++) {
                    pages.push(i);
                }
                dispatch(method({pages}));

                return;
            }

            for (let i = currentPage; i <= currentPage + 5; i++) {
                pages.push(i);
            }

            dispatch(method({pages}));
        }
    },

}



