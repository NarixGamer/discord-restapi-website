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

        function changeShape(event) {
          const shape = document.getElementById("shape");
          const content = document.getElementById("content");
        
          if (event.target === shape) {
            if (shape.classList.contains("clicked")) {
              shape.classList.remove("clicked");
              content.textContent = "";
            } else {
              shape.classList.add("clicked");
              content.innerHTML = 'Do you like my Website? Are there any improvements that need to be done? I would be happy to get feedback from you on <a class="link" href="https://drip.narix.dev/friend-request.html">Discord!</a>';
            }
          }
        }
        
      
          document.addEventListener("click", function(event) {
            const shape = document.getElementById("shape");
            
            if (!shape.contains(event.target)) {
              shape.classList.remove("clicked");
              document.getElementById("content").textContent = "";
            }
          });