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


const rajupalemImages = document.querySelectorAll(".rajupalemImg");

const rajupalemObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("rajupalemLoaded");
                img.closest(".rajupalemCard")
                   .classList.add("rajupalemImageLoaded");
            };

            rajupalemObserver.unobserve(img);
        }
    });
},{
    root:null,
    threshold:0.1,
    rootMargin:"150px"
});

rajupalemImages.forEach(img=>{
    rajupalemObserver.observe(img);
});

const kovvurImages = document.querySelectorAll(".kovvurImg");

const kovvurObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("kovvurLoaded");
                img.closest(".kovvurCard")
                   .classList.add("kovvurImageLoaded");
            };

            kovvurObserver.unobserve(img);
        }
    });
},{
    threshold:0.1,
    rootMargin:"160px"
});

kovvurImages.forEach(img=>{
    kovvurObserver.observe(img);
});

const tanukuImages = document.querySelectorAll(".tanukuImg");

const tanukuObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("tanukuLoaded");
                img.closest(".tanukuCard")
                   .classList.add("tanukuImageLoaded");
            };

            tanukuObserver.unobserve(img);
        }
    });
},{
    threshold:0.1,
    rootMargin:"160px"
});

tanukuImages.forEach(img=>{
    tanukuObserver.observe(img);
});

const giftTypeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;

        img.onload = ()=>{
            img.classList.add("giftTypeLoaded");
            img.parentElement.classList.add("giftTypeImageLoaded");
        };

        giftTypeObserver.unobserve(img);
    });
},{
    threshold:0.15
});

document.querySelectorAll(".giftTypeImg").forEach(img=>{
    giftTypeObserver.observe(img);
});

const giftBannerTrack = document.getElementById("giftBannerTrack");
const giftBannerDots = document.querySelectorAll(".giftBannerDot");
const giftBannerImages = document.querySelectorAll(".giftBannerImg");

giftBannerTrack.addEventListener("scroll", ()=>{
  const index = Math.round(
    giftBannerTrack.scrollLeft / giftBannerTrack.clientWidth
  );

  giftBannerDots.forEach(dot => dot.classList.remove("active"));
  giftBannerDots[index]?.classList.add("active");
});

const giftBannerObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;

    const img = entry.target;

    if(!img.src){
      img.src = img.dataset.src;
    }

    img.onload = ()=>{
      img.classList.add("giftBannerLoaded");
      img.closest(".giftBannerSlide")
         .classList.add("giftBannerImageLoaded");
    };

    giftBannerObserver.unobserve(img);
  });
},{
  threshold:0.15,
  rootMargin:"160px"
});

giftBannerImages.forEach(img=>{
  giftBannerObserver.observe(img);
});
