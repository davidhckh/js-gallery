let allFullscreenImages = [];

const updateFullscreenImg = (imgId) => {
    document.getElementById('fullscreen-image').src = './img/' + imgId + '.jpg';
    currentFullscreenImageId = imgId;
};


const openFullscreen = (imgId) => {
    /**show either favorites or normals */
    allFullscreenImages = [];
    if(favorites.includes(imgId)){
        allFullscreenImages = favorites;
    } else {
        for(i = 0; i < 25; i++){
            if(!favorites.includes(i)){
                allFullscreenImages.push(i);
            };
        };
    };


    updateFullscreenImg(imgId);
    fullscreenAnimation(true);
    fullscreenNext(0);
};


/**fullscreen back or forward button click */
const fullscreenNext = (by) => {
    updateFullscreenImg(allFullscreenImages[allFullscreenImages.indexOf(currentFullscreenImageId) + by]);
    
    /**show fullscreen next buttons to avoid hiding on mobile (without mouse movement )*/
    if(isMobileBrowser){
        document.getElementById('fullscreen-back-btn').classList.remove('hide');
        document.getElementById('fullscreen-forward-btn').classList.remove('hide');
    };

    /**hide button when first or last image */
    if(allFullscreenImages.indexOf(currentFullscreenImageId) == 0) {
        document.getElementById('fullscreen-back-btn').classList.add('hide');
    };

    if(allFullscreenImages.indexOf(currentFullscreenImageId) + 1 == allFullscreenImages.length) {
        document.getElementById('fullscreen-forward-btn').classList.add('hide');
    };

    updateFullscreenFavoriteIcon();
};


/**check if current fullscreen image is favorite and update icon */
const updateFullscreenFavoriteIcon = () => {
    const favoriteFullscreenBtn = document.getElementById('fullscreen-favorite-btn');
    if(favorites.includes(currentFullscreenImageId)){
        favoriteFullscreenBtn.classList.replace('far', 'fas');
    } else {
        favoriteFullscreenBtn.classList.replace('fas', 'far');
    };
};


/**hide or show fullscreen with animation */
const fullscreenAnimation = (show) => {
    const imageToZoom = document.getElementById('img-' + currentFullscreenImageId);
    const fullscreenImage = document.getElementById('fullscreen-image');

    fullscreenImage.style.top = "";
    fullscreenImage.style.left = "";

    /**from */
    if(show){
        fullscreenContainer.classList.remove('hide');

        fullscreenImage.style.top = (imageToZoom.getBoundingClientRect().top) +  'px';
        fullscreenImage.style.left = imageToZoom.getBoundingClientRect().left - (window.innerWidth / 2) + (imageToZoom.clientWidth / 2) +  'px';
        fullscreenContainer.style.background = 'rgb(0, 0, 0, 0)';
        setTimeout(()=> {
            document.querySelector('body').style.overflow='hidden';
        },350);
    } else {
        fullscreenImage.style.height = '100%';
        fullscreenImage.style.top = 0;
        fullscreenImage.style.left = 0;
        fullscreenContainer.style.background = '#191919';
        document.querySelector('body').style.overflow='visible';
        setTimeout(()=> {
            fullscreenContainer.classList.add('hide');
        },250);
    };

    /**to*/
    setTimeout( () => {
        if(show){
            fullscreenImage.style.height = '100%';
            fullscreenImage.style.top = 0;
            fullscreenImage.style.left = 0;
            fullscreenContainer.style.background = '#191919';
        } else {
            fullscreenImage.style.height = '25vh';
            fullscreenImage.style.top = (imageToZoom.getBoundingClientRect().top) +  'px';
            fullscreenImage.style.left = imageToZoom.getBoundingClientRect().left - (window.innerWidth / 2) + (imageToZoom.clientWidth / 2) +  'px';
            fullscreenContainer.style.background = 'rgb(0, 0, 0, 0)';
        };
    }, 1);
};


/**hide fullscreen buttons when mouse is far away */
document.onmousemove = () => {
    if(!isMobileBrowser && fullscreenContainer && !fullscreenContainer.classList.contains('hide')){
        const backButton = document.getElementById('fullscreen-back-btn');
        const forwardButton = document.getElementById('fullscreen-forward-btn');

        if(allFullscreenImages.indexOf(currentFullscreenImageId) != 0) {
            if(event.clientX < (window.innerWidth/3)){
                backButton.classList.remove('hide');
            } else {
                backButton.classList.add('hide');
            };
        };

        if(allFullscreenImages.indexOf(currentFullscreenImageId) + 1 != allFullscreenImages.length) {
            if(event.clientX > (window.innerWidth/3) * 2){
                forwardButton.classList.remove('hide');
            } else {
                forwardButton.classList.add('hide');
            };
        };
    };
};