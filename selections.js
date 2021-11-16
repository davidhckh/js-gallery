/**select image */
const selectImg = (imgId) => {
    const selectButton = document.getElementById('mark-' + imgId);

    /**update selected images list and select button icons*/
    if(selectedImages.includes(imgId)){
        selectButton.classList.replace('fa-check-circle', 'fa-circle');
        selectButton.classList.replace('fas', 'far');
        document.getElementById('content-img-' + imgId).classList.remove('img-selected');
        selectedImages.splice(selectedImages.indexOf(imgId), 1);
    } else {
        selectButton.classList.replace('fa-circle', 'fa-check-circle');
        selectButton.classList.replace('far', 'fas');
        document.getElementById('content-img-' + imgId).classList.add('img-selected');
        selectedImages.push(imgId);
    };

    updateSelectionHeader();
};


/**update selection header */
const updateSelectionHeader = () => {
    if(selectedImages.length > 0){
        const addFavoritesButton =document.getElementById('selection-header-add-favorite');
        const removeFavoritesButton=document.getElementById('selection-header-remove-favorite');

        document.getElementById('selection-header').classList.remove('hide');
        document.getElementById('selected-amount').innerHTML = selectedImages.length + " selected";

        /**buttons */
        let containsFavorite = false;
        let containsNormal = false;

        for(i = 0; selectedImages.length > i; i++) {
            if(favorites.includes(selectedImages[i])){
                containsFavorite = true;
            } else {
                containsNormal = true;
            };
        };

        if(containsNormal) {
            addFavoritesButton.classList.remove('hide');
        } else {
            addFavoritesButton.classList.add('hide');
        };

        if(containsFavorite) {
            removeFavoritesButton.classList.remove('hide');
        } else {
            removeFavoritesButton.classList.add('hide');
        };

    } else {
        document.getElementById('selection-header').classList.add('hide');
    };
};


/**unselect all */
const clearSelections = () => {
    while(selectedImages.length != 0){
        selectImg(selectedImages[0]);
    };
};
