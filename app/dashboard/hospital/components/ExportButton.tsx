"use client";

import { jsPDF } from 'jspdf';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
    data: any[];
    filename?: string;
    title?: string;
    columns?: { key: string; label: string }[];
    type?: 'pdf' | 'excel' | 'csv';
}

export default function ExportButton({
    data,
    filename = 'export',
    title = 'Export Data',
    columns,
    type,
}: ExportButtonProps) {
    const exportToPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Title
        doc.setFontSize(18);
        doc.text(title, 14, 20);

        // Date
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        let yPosition = 45;
        const lineHeight = 7;

        // Data
        doc.setFontSize(10);
        data.forEach((item, index) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }

            let text = `${index + 1}. `;
            if (columns) {
                text += columns.map(col => `${col.label}: ${item[col.key] || 'N/A'}`).join(' | ');
            } else {
                text += JSON.stringify(item);
            }

            // Wrap text if too long
            const lines = doc.splitTextToSize(text, pageWidth - 28);
            doc.text(lines, 14, yPosition);
            yPosition += lineHeight * lines.length;
        });

        doc.save(`${filename}.pdf`);
    };

    const exportToExcel = () => {
        // Prepare data
        const exportData = data.map(item => {
            if (columns) {
                const row: any = {};
                columns.forEach(col => {
                    row[col.label] = item[col.key];
                });
                return row;
            }
            return item;
        });

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Set column widths
        const colWidths = columns?.map(() => ({ wch: 20 })) || [];
        ws['!cols'] = colWidths;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');

        // Save file
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    const exportToCSV = () => {
        // Prepare data
        const exportData = data.map(item => {
            if (columns) {
                const row: any = {};
                columns.forEach(col => {
                    row[col.label] = item[col.key];
                });
                return row;
            }
            return item;
        });

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.csv`;
        link.click();
    };

    const handleExport = (exportType: 'pdf' | 'excel' | 'csv') => {
        if (data.length === 0) {
            alert('No data to export');
            return;
        }

        switch (exportType) {
            case 'pdf':
                exportToPDF();
                break;
            case 'excel':
                exportToExcel();
                break;
            case 'csv':
                exportToCSV();
                break;
        }
    };

    // Single type button
    if (type) {
        const icons = {
            pdf: FileText,
            excel: FileSpreadsheet,
            csv: FileSpreadsheet,
        };
        const Icon = icons[type];

        return (
            <button
                onClick={() => handleExport(type)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                disabled={data.length === 0}
            >
                <Icon className="w-4 h-4" />
                Export {type.toUpperCase()}
            </button>
        );
    }

    // Multi-option export
    return (
        <div className="relative group">
            <button
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                disabled={data.length === 0}
            >
                <Download className="w-4 h-4" />
                Export
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                    onClick={() => handleExport('pdf')}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left rounded-t-lg"
                >
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Export as PDF</span>
                </button>
                <button
                    onClick={() => handleExport('excel')}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left"
                >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="font-medium">Export as Excel</span>
                </button>
                <button
                    onClick={() => handleExport('csv')}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-left rounded-b-lg"
                >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="font-medium">Export as CSV</span>
                </button>
            </div>
        </div>
    );
}
