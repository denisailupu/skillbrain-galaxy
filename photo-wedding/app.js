import { supabase } from './supabase.js';

let selectedFile = null;
let currentIndex = 0;

const fileInput = document.getElementById('fileInput');
const chooseBtn = document.getElementById('chooseBtn');
const previewBox = document.getElementById('previewBox');
const previewImg = document.getElementById('previewImg');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const error = document.getElementById('error');
const loading = document.getElementById('loading');
const gallery = document.getElementById('gallery');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');
const prevImg = document.getElementById('prevImg');
const nextImg = document.getElementById('nextImg');

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_WIDTH = 1600;
const IMAGE_QUALITY = 0.75;


let successMsg = null;

function clearSuccess() {
  if (successMsg) {
    successMsg.remove();
    successMsg = null;
  }
}

function updateLightbox() {
  const imgs = document.querySelectorAll('.card img');
  if (!imgs.length) return;
  lightboxImg.src = imgs[currentIndex].src;
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.remove('hidden');
  document.body.classList.add('no-scroll');
}

function closeLightboxFn() {
  lightbox.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

chooseBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', async () => {
  clearSuccess();
  error.textContent = '';

  const file = fileInput.files[0];
  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    error.textContent = 'Fotografia este prea mare (max 15MB).';
    fileInput.value = '';
    selectedFile = null;
    previewBox.classList.add('hidden');
    return;
  }

  const compressed = await compressImage(file);
  selectedFile = compressed;

  previewImg.src = URL.createObjectURL(compressed);
  previewBox.classList.remove('hidden');
});

sendBtn.addEventListener('click', async () => {
  error.textContent = '';
  clearSuccess();

  if (!selectedFile) {
    error.textContent = 'Nu ai ales nicio fotografie.';
    return;
  }

  loading.classList.remove('hidden');

  try {
    const filePath = `memories/${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;

    const { error: uploadError } = await supabase
      .storage
      .from('photos')
      .upload(filePath, selectedFile, { upsert: false });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase
      .storage
      .from('photos')
      .getPublicUrl(filePath);

    const publicUrl = urlData?.publicUrl;
    if (!publicUrl) throw new Error('Nu s-a putut obține URL-ul public.');

    const { error: insertError } = await supabase
      .from('memories')
      .insert({
        image_url: publicUrl,
        message: messageInput.value.trim() || null
      });

    if (insertError) throw insertError;

    selectedFile = null;
    fileInput.value = '';
    previewBox.classList.add('hidden');
    messageInput.value = '';

    successMsg = document.createElement('p');
    successMsg.className = 'success-message';
    successMsg.textContent = 'Amintirea a fost trimisă 🤍';
    document.querySelector('.form-box').appendChild(successMsg);

    await loadGallery();
  } catch (err) {
    console.error(err);
    error.textContent = err?.message || 'Eroare la trimitere.';
  } finally {
    loading.classList.add('hidden');
  }
});

gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const imgs = Array.from(document.querySelectorAll('.card img'));
    openLightbox(imgs.indexOf(e.target));
  }
});

closeLightbox.addEventListener('click', closeLightboxFn);

prevImg.addEventListener('click', (e) => {
  e.stopPropagation();
  const imgs = document.querySelectorAll('.card img');
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  updateLightbox();
});

nextImg.addEventListener('click', (e) => {
  e.stopPropagation();
  const imgs = document.querySelectorAll('.card img');
  currentIndex = (currentIndex + 1) % imgs.length;
  updateLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightboxFn();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightboxFn();
});

let startX = 0;

lightboxImg.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightboxImg.addEventListener('touchend', (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  const imgs = document.querySelectorAll('.card img');

  if (Math.abs(diff) > 50) {
    currentIndex =
      diff > 0
        ? (currentIndex + 1) % imgs.length
        : (currentIndex - 1 + imgs.length) % imgs.length;
    updateLightbox();
  }
});

async function loadGallery() {
  let resp = await supabase
    .from('memories')
    .select('*')
    .order('created_at', { ascending: false });

  if (resp.error) {
    console.error('loadGallery error (created_at):', resp.error);
    resp = await supabase
      .from('memories')
      .select('*')
      .order('id', { ascending: false });
  }

  if (resp.error) {
    console.error('loadGallery error:', resp.error);
    return;
  }

  const data = resp.data || [];
  gallery.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.image_url;
    card.appendChild(img);

    if (item.message) {
      const p = document.createElement('p');
      p.textContent = item.message;
      card.appendChild(p);
    }

    gallery.appendChild(card);
  });
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      img.src = e.target.result;
    };

    img.onload = () => {
      let { width, height } = img;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (!blob) return reject(new Error('Compresia a eșuat.'));
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        IMAGE_QUALITY
      );
    };

    img.onerror = () => reject(new Error('Fișierul nu este o imagine validă.'));
    reader.onerror = () => reject(new Error('Nu am putut citi fișierul.'));
    reader.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGallery();
});