import { jsPDF } from 'jspdf';
import { Sig } from './sig.js';

export const PDF = {
    download: () => {
        const doc = new jsPDF(); 
        const fd = new FormData(document.getElementById('appForm'));
        doc.setFontSize(18); 
        doc.setTextColor(107,78,61); 
        doc.text("PROTOCOLO DE ANAMNESE PREMIUM", 20, 20);
        
        doc.setFontSize(10); 
        doc.setTextColor(80,80,80); 
        doc.text(`Emissão: ${new Date().toLocaleString()}`, 20, 28);
        
        let y = 40; 
        const put = (k, v) => { 
            doc.setFont("helvetica","bold"); 
            doc.text(`${k}:`, 20, y); 
            doc.setFont("helvetica","normal"); 
            doc.text(`${v || '--'}`, 65, y); 
            y += 8; 
        };
        
        put("Paciente", fd.get('nome')); 
        put("Contato WA", fd.get('wa')); 
        put("Nascimento", fd.get('nasc'));
        if(fd.get('responsavel')) put("Responsável", fd.get('responsavel'));
        
        y += 4; 
        put("Alergias", (fd.get('alergia') || 'Não') + ' / ' + (fd.get('al_obs') || 'sem observações')); 
        put("Gestante", (fd.get('gestante') || 'Não') + ' / ' + (fd.get('gest_obs') || 'sem observações'));
        
        y += 4; 
        put("Foco Clínico", window.AppGlobal.type.toUpperCase());
        
        if(window.AppGlobal.type === 'facial') { 
            put("Fototipo", fd.get('foto_f')); 
            put("Análise Pele", fd.get('tipo_p')); 
        }
        else { 
            put("Peso", (fd.get('peso') || '0') + 'kg'); 
            put("Medidas", `Cint:${fd.get('cintura') || '--'} / Abd:${fd.get('abd') || '--'}`); 
        }
        
        y += 10; 
        doc.setFont("helvetica","bold"); 
        doc.text("Desejos do Paciente:", 20, y); 
        y += 6; 
        doc.setFont("helvetica","italic");
        const queixaFull = (fd.get('queixa') || '') + "\nExpectativa: " + (fd.get('objetivo') || '');
        doc.text(doc.splitTextToSize(queixaFull, 170), 20, y);
        
        y += 35; 
        doc.setFont("helvetica","bold"); 
        doc.text("Assinatura Validada via TCLE Digital", 20, y);
        
        try { 
            if(Sig.cv) {
                const sigData = Sig.cv.toDataURL('image/png');
                doc.addImage(sigData, 'PNG', 20, y + 5, 50, 25); 
            }
        } catch(e){
            console.error("Erro ao adicionar assinatura ao PDF:", e);
        }
        
        doc.save(`Anamnese_${fd.get('nome') || 'Paciente'}.pdf`);
    }
};
