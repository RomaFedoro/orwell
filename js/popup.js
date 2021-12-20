function clearData() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

function loadData(list) {
    chrome.storage.local.set({ 'orwell': list }, function () {
        console.log('Load', list);
    });
}

function changeData(id) {
    chrome.storage.local.get(['orwell'], function (result) {
        dataSites = result['orwell'];

        if (document.getElementById(id).checked) {
            console.log('checked ' + id);
            dataSites[id].isBlocked = true;
        } else {
            console.log('unchecked ' + id);
            dataSites[id].isBlocked = false;
        };

        loadData(dataSites);
    });
}

chrome.storage.local.get(['orwell'], function (result) {
    dataSites = result['orwell'];
    console.log(dataSites);
    if (typeof dataSites == "undefined") {
        dataSites = [];
    }
    console.log(dataSites);
    
    if (dataSites.length != 0) {
        let warning = document.querySelector(".warning");
        document.body.removeChild(warning);
        console.log("Start");

        for (let id in dataSites) {

            let urlSite = dataSites[id].url;
            let active = dataSites[id].isBlocked;
            console.log(id, urlSite, active);

            let name = document.createElement('div');
            name.setAttribute('class', 'name_site');
            name.innerHTML = urlSite ;

            let checkbox = document.createElement('input');
            checkbox.setAttribute('class', 'custom-checkbox');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', id);
            if (active == 1) {
                checkbox.checked = true;
            }
            checkbox.addEventListener('change', function () {
                changeData(id);
            });
            let label = document.createElement('label');
            label.setAttribute('for', id);
            let checkboxCont = document.createElement('div');
            checkboxCont.setAttribute('class', 'checkbox');
            checkboxCont.appendChild(checkbox);
            checkboxCont.appendChild(label);

            let site = document.createElement('div');
            site.setAttribute('class', 'site');
            //site.setAttribute('id', 'site-' + id);
            site.appendChild(name);
            site.appendChild(checkboxCont);
            let container = document.querySelector('.list_sites');
            container.appendChild(site);
        }
    }
});