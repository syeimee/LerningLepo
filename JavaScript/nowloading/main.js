'use strict'

document.addEventListener('DOMContentLoaded',() => {
    alert('DOMContentLoaded!');
},false)


window.onload = () => {
    const nowLoading = document.getElementById('nowLoading');
    nowLoading.style.display = 'none';
}