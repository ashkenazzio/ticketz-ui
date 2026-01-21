/**
 * CSV Export Utility
 * Generates and downloads CSV files from data arrays
 */

interface CSVColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => string | number);
}

/**
 * Convert data array to CSV string
 */
export function toCSV<T extends object>(data: T[], columns: CSVColumn<T>[]): string {
  // Generate header row
  const headers = columns.map(col => `"${col.header}"`).join(',');

  // Generate data rows
  const rows = data.map(item => {
    return columns.map(col => {
      const value = typeof col.accessor === 'function'
        ? col.accessor(item)
        : item[col.accessor];
      // Escape quotes and wrap in quotes for safety
      const stringValue = String(value ?? '').replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',');
  });

  return [headers, ...rows].join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Export data to CSV and trigger download
 */
export function exportToCSV<T extends object>(
  data: T[],
  columns: CSVColumn<T>[],
  filename: string
): void {
  const csv = toCSV(data, columns);
  downloadCSV(csv, filename);
}
