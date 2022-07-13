const navLinks = document.querySelector(".nav__links");
const links  = document.querySelectorAll(".nav__link");
const learnMore = document.querySelector(".btn--learn_more");
const section2 = document.querySelector(".section--2");
const section1 = document.querySelector(".section--1");
const nav = document.querySelector(".nav");
const slide_left = document.querySelector(".slider__btn--left");
const slide_right = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");
const tabContainer = document.querySelector(".tab-container");
const tabContent = document.querySelectorAll(".content_");
const tabCircle = document.querySelector(".tab-circle");
const tabs = document.querySelectorAll(".tab");
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const navLinkMenu = document.querySelector(".nav__link_");
console.log(menu);
hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("close");
    menu.classList.toggle("hidden");

})
learnMore.addEventListener("click",(e)=>{
    e.preventDefault();
    const rect = section2.getBoundingClientRect();
    window.scrollTo({left:window.pageXOffset,top:Math.abs(rect.top+window.pageYOffset),behavior:"smooth"});
})

const hoverLink = function(e)
{
    if(e.target.classList.contains('nav__link'))
    {
        links.forEach(l=>{
            if(l!==e.target)
            {
                
                l.style.opacity =this;
                l.style.transition= `opacity .5s ease-in-out`;

            }
        })
        
    }
}

navLinks.addEventListener("mouseover",hoverLink.bind(.5));
navLinks.addEventListener("mouseout",hoverLink.bind(1));


const callsec1=function(enteries,obs)
{
    const [entry] = enteries;
    nav.classList.toggle("sticky",!entry.isIntersecting);

}

const option1={
    root:null,
    threshold:0.1,
    rootMargin:`+${nav.getBoundingClientRect().height}px`

}

const sec1Obs = new IntersectionObserver(callsec1,option1);
sec1Obs.observe(section1);

const lazy_img = document.querySelectorAll('.lazy');

const callLazy = function(enteries,obs)
{
    const [entry]=enteries;
    console.log(entry);
    if(!entry.isIntersecting) return;
    console.log('hi');


    console.log(entry.target.dataset.src);
    entry.target.src = entry.target.dataset.src;
    

    entry.target.addEventListener("load",()=>{
        entry.target.classList.remove("lazy");

    });
    obs.unobserve(entry.target);

}

const option2={
    root:null,
    threshold:1
}
const lazy_observer = new IntersectionObserver(callLazy,option2);

lazy_img.forEach(img=>lazy_observer.observe(img));

let slide = 0;



slides.forEach((s,i)=>{
    s.style.transform=`translateX(${100*i}%)`;
})


function goToSLide()
{
    slides.forEach((s,i)=>{
        const translate = 100*(i-slide);
        if(translate===0)
        {
            s.classList.add("slide--active");
        }
        else{
           s.classList.remove("slide--active");

        }
        s.style.transform=`translateX(${translate}%)`;
    })
    

}


const rightSlide=function()
{
    slide++;
    if(slide>=slides.length)
    {
        slide=0;
    }
    goToSLide();
    
}
slide_right.addEventListener("click",rightSlide);



const leftSilde=function()
{
    slide--;
    if(slide<0)
    {
        slide=slides.length-1;
    }
    goToSLide();

}

document.addEventListener("keydown",(e)=>{
    console.log(e.key);
    if(e.key==='ArrowRight')
    {
        rightSlide();
    }
    if(e.key==='ArrowLeft')
    {
        leftSilde();
    }
});

slide_left.addEventListener("click",leftSilde);


tabContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("tab") || e.target.classList.contains("content"))
    {
        if(e.target.classList.contains("content"))
        {
            tab_ = e.target.parentElement;
        }
        else{
            tab_ = e.target;
        }
        const data = tab_.dataset.soruce; 
        const color = tab_.dataset.color;
        tabContent.forEach((tab)=>{
            tab.classList.remove("tab--active");
        });

        tabs.forEach(t=>{
            t.classList.remove("tab--active");
        })
        tab_.classList.add("tab--active");
        tabCircle.style.background=color;
        tabContent.forEach(t=>t.classList.remove("content--active"));

        document.querySelector(`.content--${data}`).classList.add("content--active");


    }
});
menu.addEventListener("click",(e)=>{
    if(e.target.classList.contains("nav__link_"))
    {
        menu.classList.add("hidden");
        hamburger.classList.remove("close");
    }
})