document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    setupLoginPage();
    setupCakePage();
    setupWishesPage();
    setupPhotosPage();
    setupPhotoModal();
    setupWishesFullscreen();
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 800);
}

function setupLoginPage() {
    const loginBtn = document.getElementById('loginBtn');
    const nameInput = document.getElementById('nameInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    loginBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();
        const correctName = '徐馨月';
        const correctPassword = '118';
        
        if (!name) {
            showError('请输入你的名字');
            nameInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                nameInput.style.borderColor = '#ffb6c1';
            }, 2000);
        } else if (name !== correctName) {
            showError('用户名错误，请重试');
            nameInput.value = '';
            nameInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                nameInput.style.borderColor = '#ffb6c1';
            }, 2000);
        } else if (!password) {
            showError('请输入密码');
            passwordInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                passwordInput.style.borderColor = '#ffb6c1';
            }, 2000);
        } else if (password !== correctPassword) {
            showError('密码错误，请重试');
            passwordInput.value = '';
            passwordInput.style.borderColor = '#ff4757';
            setTimeout(() => {
                passwordInput.style.borderColor = '#ffb6c1';
            }, 2000);
        } else {
            hideError();
            createConfetti();
            playBirthdaySong();
            setTimeout(() => {
                showPage('cakePage');
            }, 500);
        }
    });
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }
}

function setupCakePage() {
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    let candlesBlown = false;
    
    blowCandlesBtn.addEventListener('click', function() {
        if (!candlesBlown) {
            const flames = document.querySelectorAll('.flame');
            flames.forEach(flame => {
                flame.classList.add('extinguished');
            });
            
            createConfetti();
            blowCandlesBtn.textContent = '蜡烛已熄灭';
            candlesBlown = true;
            
            setTimeout(() => {
                showPage('wishesPage');
            }, 1500);
        }
    });
}

function setupWishesPage() {
    const nextToPhotosBtn = document.getElementById('nextToPhotosBtn');
    
    nextToPhotosBtn.addEventListener('click', function() {
        showPage('photosPage');
    });
}

function setupPhotosPage() {
    const restartBtn = document.getElementById('restartBtn');
    
    restartBtn.addEventListener('click', function() {
        resetAllPages();
        showPage('loginPage');
        
        const nameInput = document.getElementById('nameInput');
        const passwordInput = document.getElementById('passwordInput');
        nameInput.value = '';
        passwordInput.value = '';
        
        const flames = document.querySelectorAll('.flame');
        flames.forEach(flame => {
            flame.classList.remove('extinguished');
        });
        
        const blowCandlesBtn = document.getElementById('blowCandlesBtn');
        blowCandlesBtn.textContent = '吹蜡烛';
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
        } else {
            page.classList.add('hidden');
        }
    });
}

function resetAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#ff9a9e', '#fecfef', '#ffd93d', '#6bcb77', '#4d96ff', '#a55eea'];
    const shapes = ['square', 'circle', 'heart'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.style.backgroundColor = color;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'heart') {
                confetti.style.width = '15px';
                confetti.style.height = '15px';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.color = color;
                confetti.style.fontSize = '15px';
                confetti.textContent = '❤️';
            }
            
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 720 - 360;
            
            confetti.style.animation = `fall ${duration}s linear forwards`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 20);
    }
}

function playBirthdaySong() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [
            { note: 261.63, duration: 0.3 },
            { note: 261.63, duration: 0.3 },
            { note: 293.66, duration: 0.6 },
            { note: 261.63, duration: 0.6 },
            { note: 349.23, duration: 0.6 },
            { note: 329.63, duration: 1.2 },
            
            { note: 261.63, duration: 0.3 },
            { note: 261.63, duration: 0.3 },
            { note: 293.66, duration: 0.6 },
            { note: 261.63, duration: 0.6 },
            { note: 392.00, duration: 0.6 },
            { note: 349.23, duration: 1.2 },
            
            { note: 261.63, duration: 0.3 },
            { note: 261.63, duration: 0.3 },
            { note: 523.25, duration: 0.6 },
            { note: 440.00, duration: 0.6 },
            { note: 349.23, duration: 0.6 },
            { note: 329.63, duration: 0.6 },
            { note: 293.66, duration: 1.2 },
            
            { note: 466.16, duration: 0.3 },
            { note: 466.16, duration: 0.3 },
            { note: 440.00, duration: 0.6 },
            { note: 349.23, duration: 0.6 },
            { note: 392.00, duration: 0.6 },
            { note: 349.23, duration: 1.2 }
        ];
        
        let currentTime = 0;
        
        notes.forEach(({ note, duration }) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = note;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + duration);
            
            currentTime += duration;
        });
    } catch (error) {
        console.log('Audio not supported');
    }
}

function setupPhotoModal() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const photoImages = document.querySelectorAll('.photo-image');
    
    photoImages.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.src;
            modal.classList.add('show');
        });
    });
    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

function setupWishesFullscreen() {
    const wishesFullscreen = document.getElementById('wishesFullscreen');
    const wishesClose = document.querySelector('.wishes-close');
    const moreWishesBtn = document.getElementById('moreWishesBtn');
    const wishesList = document.getElementById('wishesList');
    
    function generateWishes(count) {
        const baseWishes = [
            '亲爱的徐馨月，生日快乐！',
            '愿你的人生如诗如画，充满阳光和欢笑！',
            '愿你的每一天都充满惊喜和快乐！',
            '愿所有的美好都如期而至！',
            '生日快乐！愿你永远幸福快乐！',
            '愿你的梦想都能实现！',
            '愿你的人生道路铺满鲜花！',
            '愿你的笑容永远灿烂！',
            '愿你被世界温柔以待！',
            '愿你永远被爱包围！'
        ];
        
        const wishes = [];
        for (let i = 0; i < count; i++) {
            const baseWish = baseWishes[i % baseWishes.length];
            const suffix = i < baseWishes.length ? '' : ` #${i + 1}`;
            wishes.push(baseWish + suffix);
        }
        return wishes;
    }
    
    function isInHeartShape(x, y, centerX, centerY) {
        const normalizedX = (x - centerX) / 400;
        const normalizedY = (y - centerY) / 400;
        
        const heartEquation = Math.pow(normalizedX * normalizedX + normalizedY * normalizedY - 1, 3) - 
                           normalizedX * normalizedX * Math.pow(normalizedY, 3);
        
        return heartEquation <= 0;
    }
    
    moreWishesBtn.addEventListener('click', function() {
        wishesList.innerHTML = '';
        
        const wishes = generateWishes(1000);
        const centerX = 500;
        const centerY = 500;
        
        wishes.forEach((wish, index) => {
            let x, y;
            let attempts = 0;
            
            do {
                x = Math.random() * 1000;
                y = Math.random() * 1000;
                attempts++;
            } while (!isInHeartShape(x, y, centerX, centerY) && attempts < 100);
            
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.innerHTML = `<p class="wish-item-text">${wish}</p>`;
            wishItem.style.left = x + 'px';
            wishItem.style.top = y + 'px';
            wishItem.style.animationDelay = (index * 0.01) + 's';
            wishesList.appendChild(wishItem);
        });
        
        wishesFullscreen.classList.add('show');
        createConfetti();
    });
    
    wishesClose.addEventListener('click', function() {
        wishesFullscreen.classList.remove('show');
    });
    
    wishesFullscreen.addEventListener('click', function(e) {
        if (e.target === wishesFullscreen) {
            wishesFullscreen.classList.remove('show');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wishesFullscreen.classList.contains('show')) {
            wishesFullscreen.classList.remove('show');
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);