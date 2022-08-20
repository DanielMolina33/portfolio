'use strict'

const app = {
    init: () => {
        window.addEventListener("load", createObserver);
    }
}

function setObserver(observer){
    const pages = document.getElementsByTagName("section");
    for(let page of pages){
        observer.observe(page);
    }
}

function createObserver(e){
    let observer;
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
        /*
            These options may affect page performance
            trackVisibility: true,
            delay: 100
        */
    }

    observer = new IntersectionObserver(handleIntersect, options);
    setObserver(observer);
}

function handleIntersect(entries){
    entries.forEach((entry) => {
        const isVisible = entry.intersectionRatio >= 0.2;

        if(isVisible){
            setPaginatorLink(entry, "visible");
        } else {
            setPaginatorLink(entry, "noVisible");
        }
    });
}

function setPaginatorLink(entry, status){
    const paginatorLink = document.getElementsByClassName("paginator-link");
    const page = entry.target.id;
    let i;

    switch(page){
        case "page1":
            i = 0;
            break;
        case "page2":
            i = 1;
            break;
        case "page3":
            i = 2;
            break;
        default:
            i = 0;
            break;
    }

    paginator(paginatorLink[i], status);
}

function paginator(link, status){
    const classList = link.classList;

    if(status == "visible"){
        classList.add("active");
    } else {
        classList.remove("active");
    }
}