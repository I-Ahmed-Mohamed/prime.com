const { jsPDF } = window.jspdf;

const imageUploader = document.getElementById('imageUploader');
const downloadPdf = document.getElementById('downloadPdf');
const downloadExcel = document.getElementById('downloadExcel');
const downloadWord = document.getElementById('downloadWord');

let uploadedFiles = []; // الملفات المحمّلة

// تحميل الملفات
imageUploader.addEventListener('change', (event) => {
  const files = event.target.files;

  uploadedFiles = [];
  for (let i = 0; i < files.length; i++) {
    uploadedFiles.push(files[i]);
  }

  alert(`${uploadedFiles.length} ملف/صورة تم تحميلها بنجاح.`);
});

// تصدير PDF (صور فقط)
downloadPdf.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    alert('من فضلك اختر صورًا أو ملفات أولاً');
    return;
  }

  const pdf = new jsPDF();
  let hasImages = false;

  uploadedFiles.forEach((file, index) => {
    if (file.type.startsWith('image/')) {
      hasImages = true;

      const reader = new FileReader();
      reader.onload = function (e) {
        if (index > 0) pdf.addPage();
        pdf.addImage(e.target.result, 'JPEG', 10, 10, 180, 0);

        if (index === uploadedFiles.length - 1) {
          pdf.save('portfolio.pdf');
        }
      };
      reader.readAsDataURL(file);
    }
  });

  if (!hasImages) {
    alert('من فضلك اختر صورًا فقط لإنشاء PDF.');
  }
});

// تصدير Excel (كل الملفات)
downloadExcel.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    alert('من فضلك اختر صورًا أو ملفات أولاً');
    return;
  }

  const wb = XLSX.utils.book_new();
  const wsData = [['اسم الملف', 'نوع الملف', 'الحجم (كيلوبايت)']];

  uploadedFiles.forEach((file) => {
    wsData.push([file.name, file.type, (file.size / 1024).toFixed(2)]);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'الملفات');
  XLSX.writeFile(wb, 'portfolio.xlsx');
});

// تصدير Word (قائمة الملفات)
downloadWord.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    alert('من فضلك اختر صورًا أو ملفات أولاً');
    return;
  }

  const zip = new PizZip();
  const doc = new window.docxtemplater(zip);

  const content = uploadedFiles.map((file, index) => `ملف ${index + 1}: ${file.name}`).join('\n');

  doc.loadZip(zip);
  doc.setData({ content });

  try {
    doc.render();
    const out = doc.getZip().generate({ type: 'blob' });
    saveAs(out, 'portfolio.docx');
  } catch (error) {
    console.error('Error creating Word file:', error);
    alert('حدث خطأ أثناء إنشاء ملف Word.');
  }
});
