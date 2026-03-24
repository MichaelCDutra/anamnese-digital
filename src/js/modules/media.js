export const Media = {
    listen: (inp) => {
        const fls = Array.from(inp.files); 
        if(!fls.length) return;
        if(window.AppGlobal.imgs.length >= 3) { 
            alert("Limite de 3 fotos atingido."); 
            return; 
        }
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'flex';
        
        let processed = 0;
        fls.forEach(f => {
            const rd = new FileReader(); 
            rd.readAsDataURL(f);
            rd.onload = e => {
                const i = new Image(); 
                i.src = e.target.result;
                i.onload = () => {
                    const cv = document.createElement('canvas'); 
                    let w = i.width, h = i.height;
                    const max = 700;
                    if(w > max || h > max) { 
                        if(w > h) { h *= (max / w); w = max; } 
                        else { w *= (max / h); h = max; } 
                    }
                    cv.width = w; cv.height = h; 
                    cv.getContext('2d').drawImage(i, 0, 0, w, h);
                    const b64 = cv.toDataURL('image/jpeg', 0.65);
                    const id = 'img_' + Math.random().toString(16).slice(2);
                    window.AppGlobal.imgs.push({ id, data: b64 });
                    
                    const div = document.createElement('div'); 
                    div.className = 'gal-item'; 
                    div.id = id;
                    div.innerHTML = `<img src="${b64}"><button type="button" class="btn-rm" data-id="${id}">×</button>`;
                    
                    const gal = document.getElementById('gal');
                    if(gal) gal.appendChild(div);
                    
                    // Add listener to the new button
                    const btn = div.querySelector('.btn-rm');
                    if(btn) btn.addEventListener('click', () => Media.rm(id));
                    
                    processed++; 
                    if(processed === fls.length) { 
                        if(loader) loader.style.display = 'none'; 
                        inp.value = ''; 
                    }
                };
            };
        });
    },
    rm: (id) => { 
        const el = document.getElementById(id);
        if(el) el.remove(); 
        window.AppGlobal.imgs = window.AppGlobal.imgs.filter(x => x.id !== id); 
    }
};
