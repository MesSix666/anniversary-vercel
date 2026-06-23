// 修改这里：把日期换成你们正式在一起的日期，格式必须是 YYYY-MM-DD。
const LOVE_START_DATE = "2024-06-24";

// 照片墙在这里维护。想加很多张照片，只要继续往数组里加即可。
// 例如：{ src: "./assets/photo7.jpg", caption: "这一天也很想你。" },
const PHOTOS = [
  { src: "./assets/photo0.jpg", caption: "故事开始，先牵个手。" },
  { src: "./assets/photo0.5.jpg", caption: "第一次一起出去玩，乐山逛吃嘿嘿嘿。" },
  { src: "./assets/photo1.jpg", caption: "贵州划船，主打一个用力过猛。" },
  { src: "./assets/photo1.5.jpg", caption: "西昌那次，终于有张别人拍的合照。" },
  { src: "./assets/photo2.jpg", caption: "没买到票，转头去看熊猫。" },
  { src: "./assets/photo3.jpg", caption: "成都海洋馆，看鱼摆摆。" },
  { src: "./assets/photo4.jpg", caption: "峨眉山，看雪成功。" },
  { src: "./assets/photo5.jpg", caption: "宜宾李庄古镇，确实不错。" },
  { src: "./assets/photo6.jpg", caption: "重庆，赛博朋克城市打卡。" },
  { src: "./assets/photo7.jpg", caption: "喇叭河，夏天避暑真的可以。" },
  { src: "./assets/photo8.jpg", caption: "这组表情包可以留档。" },
  { src: "./assets/photo9.jpg", caption: "正式拍照，稍微装一下。" },
  { src: "./assets/photo12.jpg", caption: "北京环球影城，排队排麻了。" },
  { src: "./assets/photo13.jpg", caption: "青城山，出发前最后一次旅游。" },
];

document.addEventListener("DOMContentLoaded", () => {
  updateDaysTogether();
  renderPhotoGrid();
  bindScrollButtons();
  bindMusic();
  bindLightbox();
  bindRevealAnimation();
});

function updateDaysTogether() {
  const counter = document.querySelector("#daysTogether");
  const start = new Date(`${LOVE_START_DATE}T00:00:00`);
  const now = new Date();

  if (Number.isNaN(start.getTime())) {
    counter.textContent = "请在 script.js 里设置正确的恋爱开始日期";
    return;
  }

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.max(0, Math.floor((today - startDay) / 86400000));

  counter.textContent = `我们已经在一起 ${days} 天`;
}

function bindScrollButtons() {
  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTo);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function bindMusic() {
  const audio = document.querySelector("#bgMusic");
  const button = document.querySelector("#musicButton");
  const label = document.querySelector("#musicLabel");

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        button.classList.add("playing");
        label.textContent = "暂停";
      } else {
        audio.pause();
        button.classList.remove("playing");
        label.textContent = "音乐";
      }
    } catch (error) {
      label.textContent = "未放音乐";
      console.warn("请把音乐文件放到 assets/music.mp3 后再播放。", error);
    }
  });
}

function renderPhotoGrid() {
  const grid = document.querySelector("#photoGrid");

  grid.innerHTML = PHOTOS.map((photo, index) => {
    const alt = photo.alt || `照片 ${index + 1}`;

    return `
      <button class="photo-card reveal" type="button" data-image="${photo.src}" data-caption="${escapeHtml(photo.caption)}">
        <img src="${photo.src}" alt="${escapeHtml(alt)}" loading="lazy" />
        <span>${escapeHtml(photo.caption)}</span>
      </button>
    `;
  }).join("");
}

function bindLightbox() {
  const lightbox = document.querySelector("#lightbox");
  const image = document.querySelector("#lightboxImage");
  const caption = document.querySelector("#lightboxCaption");
  const close = document.querySelector("#lightboxClose");

  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      image.src = card.dataset.image;
      caption.textContent = card.dataset.caption;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}
