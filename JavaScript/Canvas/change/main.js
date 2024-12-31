'use strict'

const handleChange = () =>{
    const checkAll = document.getElementById('checkall');
    const checkboxes = document.getElementsByName('language');

    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = checkAll.checked;

    }

}


const ca = document.getElementById('checkall');
ca.addEventListener('change',handleChange,false)