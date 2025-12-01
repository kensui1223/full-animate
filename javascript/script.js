// ローディング
window.addEventListener('load', ()=>{
  const loader = document.getElementById('loader');
  if(loader) loader.style.display='none';
});

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', ()=>{
  navLinks.classList.toggle('active');
});

// 利用シーンパララックス
const sceneImgs = document.querySelectorAll('.scene-block img');
window.addEventListener('scroll', ()=>{
  const scrollY = window.scrollY;
  sceneImgs.forEach(img=>{
    img.style.transform = `translateY(${scrollY*0.03}px)`; // 少し動く
  });
});

// 豪華スクロールアニメーション
const animatedItems = document.querySelectorAll(
  '.feature-block, .step, .scene-block, .card, .review-item, .contact'
);
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      if(!entry.target.classList.contains('animated')){
        const rand = Math.random();
        if(rand<0.33){
          entry.target.style.animation = 'bounceIn 1s forwards';
        } else if(rand<0.66){
          entry.target.style.animation = 'rotateIn 1s forwards';
        } else {
          entry.target.style.animation = 'zoomIn 1s forwards';
        }
        entry.target.classList.add('animated'); // 一度だけアニメーション
      }
    }
  });
},{threshold:0.2});
animatedItems.forEach(item=>observer.observe(item));

// カートアニメーション
const cartIcon = document.getElementById('cart-icon');
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.card');
    const img = card.querySelector('img');
    const clone = img.cloneNode(true);
    const rect = img.getBoundingClientRect();
    clone.style.position='fixed';
    clone.style.left = rect.left+'px';
    clone.style.top = rect.top+'px';
    clone.style.width = rect.width+'px';
    clone.style.height = rect.height+'px';
    clone.style.transition='all 0.8s ease-in-out';
    clone.style.zIndex=1500;
    document.body.appendChild(clone);

    const cartRect = cartIcon.getBoundingClientRect();
    setTimeout(()=>{
      clone.style.left = cartRect.left+'px';
      clone.style.top = cartRect.top+'px';
      clone.style.width = '40px';
      clone.style.height = '40px';
      clone.style.opacity=0.5;
    },10);
    setTimeout(()=>{ clone.remove(); },900);
  });
});