import { Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { GeneratedDocument } from '@/types/mediation';

export async function exportToDocx(doc: GeneratedDocument, fileName?: string) {
  const lines = doc.contentPlainText.split('\n');

  const children: (Paragraph | Table)[] = [];

  // Parse lines into paragraphs
  let inSignatureBlock = false;
  const signatureLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('İMZA BLOĞU') || line.includes('BAŞVURUCU / VEKİLİ') && line.includes('ARABULUCU')) {
      inSignatureBlock = true;
      signatureLines.push(line);
      continue;
    }

    if (inSignatureBlock) {
      signatureLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      children.push(new Paragraph({ text: '', spacing: { after: 120 } }));
      continue;
    }

    // Check if it's a primary header
    if (
      trimmed === 'T.C.' ||
      trimmed === 'ADALET BAKANLIĞI' ||
      trimmed === 'ARABULUCULUK DAİRE BAŞKANLIĞI' ||
      trimmed.includes('ARABULUCULUK BÜROSU') ||
      trimmed.includes('ARABULUCULUK DAVET MEKTUBU') ||
      trimmed.includes('ARABULUCULUK BİLGİLENDİRME VE İLK OTURUM TUTANAĞI') ||
      trimmed.includes('ARABULUCULUK SON TUTANAĞI') ||
      trimmed.includes('ARABULUCULUK ANLAŞMA BELGESİ')
    ) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 24, // 12pt
              font: 'Times New Roman',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 80 },
        })
      );
      continue;
    }

    // Check if it's a section header
    if (
      trimmed.startsWith('BÜRO DOSYA NO') ||
      trimmed.startsWith('ARABULUCU BİLGİLERİ') ||
      trimmed.startsWith('BAŞVURUCU') ||
      trimmed.startsWith('KARŞI TARAF') ||
      trimmed.startsWith('TOPLANTI BİLGİLERİ') ||
      trimmed.startsWith('BİLGİLENDİRME VE İŞLEYİŞ SÜRECİ:') ||
      trimmed.startsWith('TARAFLARIN BEYANLARI:') ||
      trimmed.startsWith('SONUÇ') ||
      trimmed.startsWith('UYUŞMAZLIK KONUSU') ||
      trimmed.startsWith('YASAL İHTARAT') ||
      trimmed.startsWith('MADDE ')
    ) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              size: 22, // 11pt
              font: 'Times New Roman',
            }),
          ],
          alignment: AlignmentType.LEFT,
          spacing: { before: 140, after: 60 },
        })
      );
      continue;
    }

    // Standard body text
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 22, // 11pt
            font: 'Times New Roman',
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100, line: 276 }, // 1.15 line spacing
      })
    );
  }

  // Create signature table if we have signature block
  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const sigTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: noBorder.top,
      bottom: noBorder.bottom,
      left: noBorder.left,
      right: noBorder.right,
      insideHorizontal: noBorder.top,
      insideVertical: noBorder.top,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'BAŞVURUCU / VEKİLİ', bold: true, size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [new TextRun({ text: '\n\n\n(İmza)', size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'ARABULUCU', bold: true, size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [new TextRun({ text: '\n\n\n(İmza ve Mühür)', size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'KARŞI TARAF / VEKİLİ', bold: true, size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [new TextRun({ text: '\n\n\n(İmza)', size: 20, font: 'Times New Roman' })],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        ],
      }),
    ],
  });

  children.push(new Paragraph({ text: '', spacing: { before: 200, after: 200 } }));
  children.push(sigTable);

  const wordDoc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 2.54 cm
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  const { Packer } = await import('docx');
  const blob = await Packer.toBlob(wordDoc);
  const safeName = (fileName || doc.title).replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ_-]/g, '_') + '.docx';
  saveAs(blob, safeName);
}
