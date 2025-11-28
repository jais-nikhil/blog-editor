import React from 'react';
import { Trash2, Plus, X, ChevronUp, ChevronDown, Table as TableIcon } from 'lucide-react';
import type { TableData } from '../../types';

interface TableSubCardProps {
  data: Partial<TableData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const TableSubCard: React.FC<TableSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const headers = data.headers || ['Header 1', 'Header 2'];
  const rows = data.rows || [['', '']];

  const updateHeaders = (newHeaders: string[]) => {
    const newRows = rows.map(row => {
      const newRow = [...row];
      while (newRow.length < newHeaders.length) {
        newRow.push('');
      }
      return newRow.slice(0, newHeaders.length);
    });
    
    onUpdate({ ...data, headers: newHeaders, rows: newRows });
  };

  const updateRows = (newRows: string[][]) => {
    onUpdate({ ...data, rows: newRows });
  };

  const addColumn = () => {
    const newHeaders = [...headers, `Header ${headers.length + 1}`];
    updateHeaders(newHeaders);
  };

  const removeColumn = (index: number) => {
    if (headers.length > 1) {
      const newHeaders = headers.filter((_, i) => i !== index);
      updateHeaders(newHeaders);
    }
  };

  const addRow = () => {
    const newRow = new Array(headers.length).fill('');
    updateRows([...rows, newRow]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      updateRows(newRows);
    }
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    updateRows(newRows);
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    onUpdate({ ...data, headers: newHeaders });
  };

  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg relative">
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={onMoveUp}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move up"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move down"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <TableIcon className="h-4 w-4 text-emerald-600" />
        <h4 className="text-sm font-bold text-emerald-800">Table</h4>
      </div>
      
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="relative">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="w-full px-3 py-2 border-0 bg-transparent font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder={`Header ${index + 1}`}
                    />
                    {headers.length > 1 && (
                      <button
                        onClick={() => removeColumn(index)}
                        className="absolute top-1 right-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </th>
                ))}
                <th className="w-10">
                  <button
                    onClick={addColumn}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-200">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border-r border-gray-200 last:border-r-0">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full px-3 py-2 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter data..."
                      />
                    </td>
                  ))}
                  <td className="w-10 text-center">
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(rowIndex)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-start">
          <button
            onClick={addRow}
            className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Row</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSubCard;
