const updateFavorites = () => {
    const favoritesHeader = document.getElementById('favorites-header');
    const favoritesContent = document.getElementById('favorites-content');

    /** update favorites section  */
    if(favorites.length != 0){
        favoritesHeader.classList.remove('hide');
        favoritesContent.classList.remove('hide');
    } else {
        favoritesHeader.classList.add('hide');
        favoritesContent.classList.add('hide');
    };

    render();
}
;

/**add new favorite */
const favoriteImg = (imgNo) => {
    if(!favorites.includes(imgNo)){
        favorites.push(imgNo);
    } else {
        favorites.splice(favorites.indexOf(imgNo), 1);
    }

    /**update favorite icon */
    const favoriteFullscreenBtn = document.getElementById('fullscreen-favorite-btn');
    if(favorites.includes(currentFullscreenImageId)){
        favoriteFullscreenBtn.classList.replace('far', 'fas');
    } else {
        favoriteFullscreenBtn.classList.replace('fas', 'far');
    };

    /**close fullscreen if favorite from favorite fullscreen is removed */
    if(favorites == allFullscreenImages && !document.getElementById('fullscreen-container').classList.contains('hide')) {
        setTimeout(()=> {
            fullscreenAnimation(false);
        }, 1);
    };

    updateFavorites();
};


/**add all selected favorites */
const addSelectedFavorites = () => {
    for(i = 0; i < selectedImages.length; i++) {
        if(!favorites.includes(selectedImages[i])) {
            favorites.push(selectedImages[i]);
        };
    };

    updateFavorites();
    updateSelectionHeader();
    clearSelections();
};


/**remove all selected favorites */
const removeSelectedFavorites = () => {
    for(i = 0; i < selectedImages.length; i++) {
        if(favorites.includes(selectedImages[i])) {
            favorites.splice(favorites.indexOf(selectedImages[i]), 1);
        }
    }

    updateFavorites();
    updateSelectionHeader();
    clearSelections();
};


/**save to local storage */
const save = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};