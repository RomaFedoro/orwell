let dataSites = [
    {
        url: 'vk.com',
        isBlocked: true,
    }, 
    {
        url: 'youtube.com',
        isBlocked: true,
    },  
    {
        url: 'meduza.io',
        isBlocked: true,
    }, 
];

function clearData() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

function getData() {
    chrome.storage.local.get(['orwell'], function (result) {
        dataSites = result['orwell'];
        console.log('Get', dataSites);
        checkBlock();
    });
}

function loadData() {
    clearData();
    chrome.storage.local.set({ 'orwell': dataSites }, function () {
        console.log('Load', dataSites);
        checkBlock();
    });
}

function blockSite() {
    while (document.body.firstChild) {
        document.body.firstChild.remove();
    }
}

function checkBlock() {
    let link = window.location.href;
    console.log(link);

    console.log(dataSites);
    for(let i in dataSites){
        site = dataSites[i];
        console.log(site);
        if(site.isBlocked) {
            if(link.includes(site.url)) {
                blockSite();
            }
        }
    }
}

chrome.storage.local.get(['orwell'], function (result) {
    if (typeof result['orwell'] == "undefined") {
        loadData();
    } else {
        getData();
    }
});

