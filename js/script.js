/* ============================================================
   SITE PARA A DANI ❤ — animações
   ============================================================ */

/* ⬇️⬇️ TROQUE AQUI pela data em que vocês começaram a namorar ⬇️⬇️ */
const DATA_INICIO = new Date('2024-01-01T00:00:00');
/* ⬆️⬆️ formato: ano-mês-dia T hora:minuto:segundo ⬆️⬆️ */

const FRASE_TYPEWRITER = 'Você é meu lugar favorito no mundo. 💖';

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('escondido');
  }, 1200);
});

/* ===== CORAÇÕES FLUTUANTES DE FUNDO ===== */
const heartsBg = document.getElementById('heartsBg');
const simbolos = ['❤', '💕', '💗', '💘', '💖'];

function criarCoracaoFlutuante() {
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = 12 + Math.random() * 22 + 'px';
  heart.style.animationDuration = 7 + Math.random() * 8 + 's';
  heartsBg.appendChild(heart);

  // remove do DOM quando a animação termina
  setTimeout(() => heart.remove(), 16000);
}

setInterval(criarCoracaoFlutuante, 700);
for (let i = 0; i < 6; i++) setTimeout(criarCoracaoFlutuante, i * 250);

/* ===== RASTRO DE CORAÇÕES NO MOUSE ===== */
let ultimoTrail = 0;
document.addEventListener('mousemove', (e) => {
  const agora = Date.now();
  if (agora - ultimoTrail < 90) return; // limita a quantidade
  ultimoTrail = agora;

  const trail = document.createElement('div');
  trail.className = 'heart-trail';
  trail.textContent = '❤';
  trail.style.left = e.clientX + (Math.random() * 16 - 8) + 'px';
  trail.style.top = e.clientY + (Math.random() * 16 - 8) + 'px';
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 1000);
});

/* ===== REVEAL AO ROLAR (IntersectionObserver) ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach((el) => observer.observe(el));

/* ===== PARALLAX SUAVE NO HERO ===== */
const heroBg = document.getElementById('heroBg');
window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }
  },
  { passive: true }
);

/* ===== EFEITO DE DIGITAÇÃO ===== */
const typewriterEl = document.getElementById('typewriter');
let typewriterIniciado = false;

const typewriterObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !typewriterIniciado) {
      typewriterIniciado = true;
      let i = 0;
      const digitar = () => {
        if (i <= FRASE_TYPEWRITER.length) {
          typewriterEl.textContent = FRASE_TYPEWRITER.slice(0, i);
          i++;
          setTimeout(digitar, 75);
        }
      };
      setTimeout(digitar, 400);
    }
  },
  { threshold: 0.6 }
);

typewriterObserver.observe(document.querySelector('.typewriter-wrap'));

/* ===== EFEITO TILT 3D NAS FOTOS ===== */
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  });
});

/* ===== CONTADOR DE TEMPO JUNTOS ===== */
const elDias = document.getElementById('dias');
const elHoras = document.getElementById('horas');
const elMinutos = document.getElementById('minutos');
const elSegundos = document.getElementById('segundos');

function atualizarContador() {
  const diff = Date.now() - DATA_INICIO.getTime();
  if (diff < 0) return;

  const seg = Math.floor(diff / 1000);
  elDias.textContent = Math.floor(seg / 86400);
  elHoras.textContent = Math.floor((seg % 86400) / 3600);
  elMinutos.textContent = Math.floor((seg % 3600) / 60);
  elSegundos.textContent = seg % 60;
}

atualizarContador();
setInterval(atualizarContador, 1000);

/* ===== BOTÃO SURPRESA: EXPLOSÃO DE CORAÇÕES ===== */
const botao = document.getElementById('botaoSurpresa');
const mensagem = document.getElementById('mensagemSecreta');

botao.addEventListener('click', (e) => {
  mensagem.classList.add('mostrar');
  explosaoDeCoracoes(e.clientX, e.clientY, 40);
});

function explosaoDeCoracoes(x, y, quantidade) {
  for (let i = 0; i < quantidade; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

    const angulo = Math.random() * Math.PI * 2;
    const distancia = 80 + Math.random() * 260;

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = 14 + Math.random() * 24 + 'px';
    heart.style.setProperty('--tx', Math.cos(angulo) * distancia + 'px');
    heart.style.setProperty('--ty', Math.sin(angulo) * distancia + 'px');
    heart.style.setProperty('--rot', Math.random() * 360 - 180 + 'deg');

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}
