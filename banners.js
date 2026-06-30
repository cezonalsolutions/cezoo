const villageImages = document.querySelectorAll(".villageImg");

const villageObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const villageImg = entry.target;

            if(!villageImg.src){
                villageImg.src = villageImg.dataset.src;
            }

            villageImg.onload = ()=>{
                villageImg.classList.add("villageLoaded");
                villageImg.closest(".villageImageBox")
                    .classList.add("villageImageLoaded");
            };

            villageObserver.unobserve(villageImg);
        }
    });
},{
    root:null,
    threshold:0.2,
    rootMargin:"120px"
});

villageImages.forEach(img=>{
    villageObserver.observe(img);
});


const mallipudiImages = document.querySelectorAll(".mallipudiImg");

const mallipudiObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("mallipudiLoaded");
                img.closest(".mallipudiCard")
                   .classList.add("mallipudiImageLoaded");
            };

            mallipudiObserver.unobserve(img);
        }
    });
},{
    threshold:0.2,
    rootMargin:"120px"
});

mallipudiImages.forEach(img=>{
    mallipudiObserver.observe(img);
});
