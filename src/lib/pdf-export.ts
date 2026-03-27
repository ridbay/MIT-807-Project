import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { User } from '../context/AppContext';
import { CourseAttempt } from './gpa-engine';

export const exportTranscriptPDF = (user: User | null, records: CourseAttempt[], currentGPA: number) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(44, 62, 80);
  doc.text('scholarNode', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('OFFICIAL ACADEMIC TRANSCRIPT', pageWidth / 2, 30, { align: 'center' });
  
  doc.setLineWidth(0.5);
  doc.line(20, 35, pageWidth - 20, 35);

  // Student Info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Student Name:', 20, 45);
  doc.setTextColor(0);
  doc.text(user?.name || 'N/A', 50, 45);

  doc.setTextColor(100);
  doc.text('Matric Number:', 20, 52);
  doc.setTextColor(0);
  doc.text(user?.matric || 'N/A', 50, 52);

  doc.setTextColor(100);
  doc.text('Programme:', 20, 59);
  doc.setTextColor(0);
  doc.text(user?.programmeName || 'N/A', 50, 59);

  doc.setTextColor(100);
  doc.text('Current CGPA:', pageWidth - 70, 45);
  doc.setTextColor(0);
  doc.text(`${currentGPA.toFixed(2)} / 5.00`, pageWidth - 40, 45);

  // Table
  const tableData = records.map(r => [
    r.courseCode,
    r.courseTitle || 'N/A',
    r.units.toString(),
    r.grade || 'N/A',
    r.point?.toFixed(1) || '0.0'
  ]);

  (doc as any).autoTable({
    startY: 70,
    head: [['Code', 'Course Title', 'Units', 'Grade', 'Point']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillStyle: 'dark', fillColor: [52, 152, 219] },
    margin: { top: 70 },
  });

  // Footer
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('This is an electronically generated document. Verify at scholarnode.edu/verify', pageWidth / 2, finalY + 20, { align: 'center' });

  doc.save(`${user?.matric || 'transcript'}_records.pdf`);
};

export const exportCertificatePDF = (user: User | null, standing: string, currentGPA: number, verificationId?: string, records: CourseAttempt[] = []) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Border
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Content
  doc.setFontSize(40);
  doc.setTextColor(44, 62, 80);
  doc.text('CERTIFICATE OF GRADUATION', pageWidth / 2, 50, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text('This is to certify that', pageWidth / 2, 70, { align: 'center' });
  
  doc.setFontSize(32);
  doc.setTextColor(52, 152, 219);
  doc.text(user?.name?.toUpperCase() || 'STUDENT NAME', pageWidth / 2, 90, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(44, 62, 80);
  doc.text(`Has successfully completed the requirements for the degree of`, pageWidth / 2, 110, { align: 'center' });
  
  doc.setFontSize(24);
  doc.text(user?.programmeName || 'COURSE OF STUDY', pageWidth / 2, 125, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text(`With a final standing of`, pageWidth / 2, 145, { align: 'center' });
  
  const isDistinction = standing.includes('First') || standing.includes('Distinction');
  if (isDistinction) {
    doc.setTextColor(39, 174, 96);
  } else {
    doc.setTextColor(44, 62, 80);
  }
  doc.text(standing.toUpperCase(), pageWidth / 2, 160, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text(`CGPA: ${currentGPA.toFixed(2)} / 5.00`, pageWidth / 2, 172, { align: 'center' });

  // Verification ID
  if (verificationId) {
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Verification ID: ${verificationId}`, pageWidth / 2, 188, { align: 'center' });
  }

  // Signature area with auto-signatures
  doc.setFontSize(10);
  doc.setTextColor(100);
  
  // Registrar Signature
  doc.line(40, pageHeight - 40, 100, pageHeight - 40);
  doc.setFont('courier', 'italic', 'bold');
  doc.setTextColor(44, 100, 160);
  doc.text('O. Adebayo', 70, pageHeight - 42, { align: 'center' }); // Auto-signature
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('Mrs. Olufunmilayo Adebayo', 70, pageHeight - 33, { align: 'center' });
  doc.setFontSize(8);
  doc.text('University Registrar', 70, pageHeight - 28, { align: 'center' });
  
  // Vice Chancellor Signature
  doc.setFontSize(10);
  doc.line(pageWidth - 100, pageHeight - 40, pageWidth - 40, pageHeight - 40);
  doc.setFont('courier', 'italic', 'bold');
  doc.setTextColor(44, 100, 160);
  doc.text('I. Gambari', pageWidth - 70, pageHeight - 42, { align: 'center' }); // Auto-signature
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text('Prof. Ibrahim Gambari', pageWidth - 70, pageHeight - 33, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Vice Chancellor', pageWidth - 70, pageHeight - 28, { align: 'center' });

  doc.save(`${user?.matric || 'certificate'}.pdf`);
};
