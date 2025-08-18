const currentPage = window.location.pathname.split("/").pop();
const jsonFilename = currentPage.replace(".html", ".json");

fetch( `../data/${jsonFilename}`)
  .then((response) => response.json())
  .then((images) => {
    const container = document.getElementById("imageSlider");
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "flex justify-center mt-3 gap-1";

    const imageWrappers = [];

    images.forEach((src, index) => {
      // 圖片外框
      const wrapper = document.createElement("div");
      wrapper.className =
        "flex-shrink-0 snap-center rounded-xl shadow border border-pink-200 overflow-hidden";
      wrapper.style.display = "inline-block";

      // 圖片本體
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.className = "w-full max-w-[360px] rounded-xl shadow";

      wrapper.appendChild(img);
      container.appendChild(wrapper);
      imageWrappers.push(wrapper);

      // 導覽點
      const dot = document.createElement("span");
      dot.className =
        "dot w-2 h-2 bg-black rounded-full transition-opacity duration-300";
      dot.style.opacity = index === 0 ? "0.8" : "0.3";
      dotsContainer.appendChild(dot);
    });

    // 插入導覽點（在圖片區下面）
    container.parentElement.appendChild(dotsContainer);

    // 滑動更新導覽點
    container.addEventListener("scroll", () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = imageWrappers[0].offsetWidth + 16; // +gap-4 (16px)
      const index = Math.round(scrollLeft / slideWidth);

      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.style.opacity = i === index ? "0.8" : "0.3";
      });
    });
  });
