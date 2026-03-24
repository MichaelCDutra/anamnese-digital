export const Sig = {
    cv: null, cx: null, d: false,
    init: () => {
        Sig.cv = document.getElementById('sig-hw'); 
        if(!Sig.cv) return;
        Sig.cx = Sig.cv.getContext('2d');
        
        const pt = (e) => { 
            const r = Sig.cv.getBoundingClientRect(); 
            const x = (e.clientX || (e.touches && e.touches[0].clientX)) - r.left;
            const y = (e.clientY || (e.touches && e.touches[0].clientY)) - r.top; 
            return { x, y }; 
        };
        const start = (e) => { 
            const chk = document.getElementById('check-tcle');
            if(chk && !chk.checked) return; 
            if(e.type==='touchstart') e.preventDefault(); 
            Sig.d=true; Sig.cx.beginPath(); 
            const p=pt(e); Sig.cx.moveTo(p.x, p.y); 
        };
        const move = (e) => { 
            if(!Sig.d) return; 
            if(e.type==='touchmove') e.preventDefault(); 
            const p=pt(e); Sig.cx.lineTo(p.x,p.y); Sig.cx.stroke(); 
        };
        
        Sig.cv.addEventListener('touchstart', start, {passive:false}); 
        Sig.cv.addEventListener('touchmove', move, {passive:false}); 
        Sig.cv.addEventListener('touchend',()=>Sig.d=false);
        Sig.cv.onmousedown=start; Sig.cv.onmousemove=move; window.onmouseup=()=>Sig.d=false;
        window.addEventListener('resize', Sig.resize);
    },
    resize: () => { 
        if(!Sig.cv) return;
        const r = Sig.cv.getBoundingClientRect(); 
        if(r.width === 0) return;
        Sig.cv.width = r.width; Sig.cv.height = r.height;
        Sig.cx.lineWidth = 2.5; Sig.cx.lineCap = 'round'; Sig.cx.strokeStyle = '#333';
    },
    clear: () => { 
        if(Sig.cx && Sig.cv) Sig.cx.clearRect(0, 0, Sig.cv.width, Sig.cv.height); 
    },
    empty: () => { 
        if(!Sig.cv) return true;
        const em = document.createElement('canvas'); 
        em.width = Sig.cv.width; em.height = Sig.cv.height; 
        return Sig.cv.toDataURL() === em.toDataURL(); 
    },
    lock: (ch) => { 
        const sw = document.getElementById('sig-wrap');
        const b = document.getElementById('btn-sub');
        if(sw) sw.classList.toggle('active', ch.checked); 
        if(b) b.disabled = !ch.checked; 
    }
};
