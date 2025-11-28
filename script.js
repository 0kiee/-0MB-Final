document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(min-width:992px)").matches) {
    console.log("Desktop animations active");

    const outletItems = gsap.utils.toArray(
      ".outlet-locations .outlet-main-wrapper .outlet-slider-wrapper .outlet-cards-holder .outlet-card"
    );

    const itemContainer = document.querySelector(
      ".outlet-locations .outlet-main-wrapper .outlet-slider-wrapper .outlet-cards-holder .outlet-card"
    );

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".outlet-main-wrapper",
        start: "top top+=10%",
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (outletItems.length - 1),
          duration: { min: 0.1, max: 0.2 },
          delay: 0.1,
        },
        end: () => "+=" + itemContainer.scrollHeight * outletItems.length,
      },
    });

    mainTimeline.to(
      ".outlet-locations .outlet-main-wrapper .outlet-slider-wrapper .outlet-cards-holder .outlet-card",
      {
        top: () => -itemContainer.scrollHeight * (outletItems.length - 1),
        ease: "none",
      }
    );

    outletItems.forEach((item, index) => {
      let slideId = item.getAttribute("data-slide-id");
      let parentTrigger = mainTimeline.scrollTrigger;

      let step = 1 / (outletItems.length + 0);
      let offset = step / 5;

      gsap.timeline({
        scrollTrigger: {
          start: () => parentTrigger.start + (parentTrigger.end - parentTrigger.start) * (index * step + offset),
          end: () => "+=" + item.offsetHeight,

          onEnter: () => {
            document.querySelector(`.pin-${index + 1}`).classList.add("active");
            document.querySelector(`.outlet-icon-wrapper--${index + 1}`).classList.add("active");

            if (index + 1 > 1) {
              document.querySelector(`.line-${index + 1}`).classList.add("active");
            }
          },

          onLeave: () => {
            if (parseInt(slideId) !== 5) {
              document.querySelector(`.pin-${index + 1}`).classList.remove("active");
              document.querySelector(`.outlet-icon-wrapper--${index + 1}`).classList.remove("active");
            }
          },

          onEnterBack: () => {
            document.querySelector(`.pin-${index + 1}`).classList.add("active");
            document.querySelector(`.outlet-icon-wrapper--${index + 1}`).classList.add("active");

            if (index - 1 > 1) {
               document.querySelector(`.line-${index + 1}`).classList.add("active");
            }
          },

          onLeaveBack: () => {
            if (parseInt(slideId) !== 1) {
              document.querySelector(`.pin-${index + 1}`).classList.remove("active");
              document.querySelector(`.outlet-icon-wrapper--${index + 1}`).classList.remove("active");
              document.querySelector(`.line-${index + 1}`).classList.remove("active");
            }
          },
        },
      });
    });
  }
});
