window.addEventListener('DOMContentLoaded', (event) => {
            const avatar = document.querySelector('.avatar');
            const banner = document.querySelector('.banner');
            
            avatar.addEventListener('mouseenter', () => {
                avatar.style.transform = 'scale(1.3)';
                banner.style.opacity = '0.5';
            });
            
            avatar.addEventListener('mouseleave', () => {
                avatar.style.transform = 'scale(1)';
                avatar.style.opacity = '1';
                banner.style.opacity = '1';
            });
            
            banner.addEventListener('mouseenter', () => {
                avatar.style.transform = 'scale(0.8)';
                avatar.style.opacity = '0.5';
                banner.style.transform = 'scale(1)';
            });
            
            banner.addEventListener('mouseleave', () => {
                avatar.style.transform = 'scale(1)';
                avatar.style.opacity = '1';
                banner.style.transform = 'scale(1)';
            });
        });