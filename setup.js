/**global variables */
let favorites = [];
let selectedImages = []
let fullscreenContainer = null;
let currentFullscreenImageId = null;
let isMobileBrowser = false;


const setup = () => {
    if(localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    };
    
    fullscreenContainer = document.getElementById('fullscreen-container');

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        isMobileBrowser = true;
    };

    render();
};



/**Render */
const render = () => {
    const content = document.getElementById('content');
    const favoritesContent = document.getElementById('favorites-content');
    const favoritesHeader = document.getElementById('favorites-header');

    content.innerHTML = ``;
    favoritesContent.innerHTML = ``;

    /** 25 is the amount of images*/
    for(i = 0; i < 25; i++) {
        if(!favorites.includes(i)){
            content.innerHTML += `  <div class="content-img-wrapper" id="img-${i}" onclick="openFullscreen(${i}); event.stopPropagation()">
                                        <img class="content-img" id="content-img-${i}" src="./img/${i}.jpg"/>
                                        <div class="img-overlay" id="menu-${i}"></div>
                                        <a class="image-btn far fa-circle" id="mark-${i}"  onclick="selectImg(${i}); event.stopPropagation()"></a>
                                    </div>`;
        };
    };

    /**render favorites */
    for(i = 0; i < favorites.length; i++){
        favoritesContent.innerHTML += ` <div class="content-img-wrapper" id="img-${favorites[i]}" onclick="openFullscreen(${favorites[i]}); event.stopPropagation()">
                                            <img class="content-img" id="content-img-${favorites[i]}" src="./img/${favorites[i]}.jpg"/>
                                            <div class="img-overlay" id="menu-${favorites[i]}"></div>
                                            <i class="image-btn  fas fa-star favorite-img-icon"></i>
                                            <a class="image-btn far fa-circle" id="mark-${favorites[i]}"  onclick="selectImg(${favorites[i]}); event.stopPropagation()"></a>
                                        </div>`;
    };

    if(favorites.length != 0){
        favoritesHeader.classList.remove('hide');
        favoritesContent.classList.remove('hide');
    } else {
        favoritesHeader.classList.add('hide');
        favoritesContent.classList.add('hide');
    };
};