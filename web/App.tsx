import React, { useState, useEffect, useMemo } from 'react';
import {
  Bot,
  FolderOpen,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Mail,
  HardDrive,
  Lock,
  Star,
  ExternalLink,
  ChevronDown,
  Cloud,
  Layout,
  FileText,
  ChevronRight,
  MoreVertical,
  Settings,
  User,
  Calendar,
  CalendarDays,
  FileType,
  MousePointerClick,
  Puzzle,
  Pin,
  Power,
  Download,
  Search,
  Loader2,
  FileCheck,
  Chrome,
  Phone,
  Linkedin
} from 'lucide-react';

// ==========================================
// 🧩 INTERACTIVE EXTENSION REPLICA
// ==========================================

const EXTENSION_STYLES = `
  #extension-root {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    overflow: hidden;
    color: white;
    width: 100%;
    max-width: 520px;
  }
  #extension-root * {
    box-sizing: border-box;
  }
  
  .bg-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.15;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: particleMove 20s linear infinite;
    pointer-events: none;
  }
  @keyframes particleMove {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50px); }
  }
  
  .ext-container {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .ext-header {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(40px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 20px 16px 20px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 
                0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .header-row-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-icon-placeholder {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .logo-text h1 {
    font-size: 17px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin: 0;
  }

  .logo-text p {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
    margin: 2px 0 0 0;
    letter-spacing: 0.3px;
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 20px;
    padding: 6px 12px;
    backdrop-filter: blur(10px);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }

  .status-text {
    font-size: 10px;
    font-weight: 600;
    color: #10b981;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 14px;
  }

  .info-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }

  .info-card.highlight {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.08));
    border-color: rgba(102, 126, 234, 0.3);
  }

  .info-icon {
    font-size: 20px;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .info-content {
    flex: 1;
    min-width: 0;
  }

  .info-label {
    font-size: 9px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .info-value {
    font-size: 13px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .progress-bar-elegant {
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #059669, #10b981);
    background-size: 200% 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    animation: progress-shimmer 3s ease-in-out infinite;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes progress-shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .tabs {
    display: flex;
    gap: 3px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 3px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3) inset,
                0 0.5px 0 rgba(255, 255, 255, 0.02);
  }

  .tab-btn {
    flex: 1;
    padding: 6px 8px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 8.5px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 32px;
  }

  .tab-btn.active {
    color: white;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 1px 8px rgba(102, 126, 234, 0.4),
                0 0.5px 0 rgba(255, 255, 255, 0.1) inset;
  }

  .tab-icon {
    font-size: 15px;
    line-height: 1;
  }

  .content-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  /* METRICS */
  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }

  .metric-label {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .dual-panels-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric-panel {
    padding: 16px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .issued-panel {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
    border-color: rgba(16, 185, 129, 0.3);
  }
  
  .received-panel {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
    border-color: rgba(239, 68, 68, 0.3);
  }

  .panel-header {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 12px;
  }

  .panel-amount {
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
  }

  .issued-panel .panel-amount { color: #86efac; }
  .received-panel .panel-amount { color: #fca5a5; }

  .panel-count {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }

  .mini-stat {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: space-between;
  }

  .balance-panel {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 16px;
    text-align: center;
  }

  .chart-container {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .chart-title {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 12px;
    text-align: center;
  }

  .bar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  
  .bar-label {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    min-width: 80px;
    text-align: right;
  }
  
  .bar-track {
    flex: 1;
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 10px;
  }
  
  .bar-value {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    min-width: 30px;
  }

  /* HISTORY */
  .history-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    margin-bottom: 10px;
    overflow: hidden;
    transition: all 0.3s;
  }

  .history-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    cursor: pointer;
  }

  .status-icon {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  .status-icon.success {
    background: linear-gradient(145deg, #34d399 0%, #10b981 100%);
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  }

  .status-icon.error {
    background: linear-gradient(145deg, #f87171 0%, #ef4444 100%);
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
  }

  .client-name {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 3px;
  }

  .date-text {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.45);
  }

  .amount-badge {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
    color: #a5b4fc;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .details-panel {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.25) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s;
  }
  
  .details-panel.expanded {
    padding: 18px;
    max-height: 350px;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  .detail-label {
    font-size: 9px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
  }

  .detail-value {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .drive-action-btn {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 12px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    margin-top: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
  }

  /* BUTTONS & FORMS */
  .btn-export {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
    margin-bottom: 16px;
    transition: all 0.3s;
  }

  .btn-export:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(16, 185, 129, 0.5);
  }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
  }

  .btn-secondary {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .form-group { margin-bottom: 18px; }
  
  .form-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  .form-input, .form-select {
    width: 100%;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 13px;
  }
  
  .form-select { cursor: pointer; }
  .form-select option { background: #1a1a2e; color: white; }

  .folder-structure-preview {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    margin-top: 8px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: #10b981;
    line-height: 1.6;
  }
`;

type InvoiceData = {
  id: string;
  cliente: string;
  cif: string;
  importe: string;
  numericAmount: number;
  direccion: 'EMITIDA' | 'RECIBIDA';
  numeroDocumento: string;
  fechaDocumento: string;
  timestamp: number;
  status: 'success' | 'error';
  ruta: string;
  driveUrl?: string;
};

const INITIAL_DATA: InvoiceData[] = [
  {
    id: '1',
    cliente: 'TechCorp Solutions',
    cif: 'B87654321',
    importe: '+2.500,00€',
    numericAmount: 2500,
    direccion: 'EMITIDA',
    numeroDocumento: 'INV-2024-001',
    fechaDocumento: '2025-01-15',
    timestamp: Date.now() - 100000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Emitidas',
    driveUrl: '#'
  },
  {
    id: '2',
    cliente: 'Amazon AWS',
    cif: 'W12345678',
    importe: '-142,50€',
    numericAmount: -142.50,
    direccion: 'RECIBIDA',
    numeroDocumento: 'AWS-EU-9912',
    fechaDocumento: '2025-01-14',
    timestamp: Date.now() - 200000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '3',
    cliente: 'Adobe Creative',
    cif: 'IE456789',
    importe: '-65,99€',
    numericAmount: -65.99,
    direccion: 'RECIBIDA',
    numeroDocumento: 'ADB-9992',
    fechaDocumento: '2025-01-10',
    timestamp: Date.now() - 500000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '4',
    cliente: 'Netflix Services',
    cif: 'ES-N987654',
    importe: '-17,99€',
    numericAmount: -17.99,
    direccion: 'RECIBIDA',
    numeroDocumento: 'NET-2025-01',
    fechaDocumento: '2025-01-09',
    timestamp: Date.now() - 600000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '5',
    cliente: 'Consultoría Global S.L.',
    cif: 'B11223344',
    importe: '+4.500,00€',
    numericAmount: 4500,
    direccion: 'EMITIDA',
    numeroDocumento: 'INV-2024-002',
    fechaDocumento: '2025-01-08',
    timestamp: Date.now() - 700000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Emitidas',
    driveUrl: '#'
  },
  {
    id: '6',
    cliente: 'Uber Payments',
    cif: 'NL-887766',
    importe: '-24,50€',
    numericAmount: -24.50,
    direccion: 'RECIBIDA',
    numeroDocumento: 'UBR-TRIP-99',
    fechaDocumento: '2025-01-08',
    timestamp: Date.now() - 800000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '7',
    cliente: 'Apple Store',
    cif: 'IE-APPL-01',
    importe: '-1.299,00€',
    numericAmount: -1299.00,
    direccion: 'RECIBIDA',
    numeroDocumento: 'APL-HW-221',
    fechaDocumento: '2025-01-07',
    timestamp: Date.now() - 900000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Inversiones',
    driveUrl: '#'
  },
  {
    id: '8',
    cliente: 'Startup Inc.',
    cif: 'B99887766',
    importe: '+850,00€',
    numericAmount: 850,
    direccion: 'EMITIDA',
    numeroDocumento: 'INV-2024-003',
    fechaDocumento: '2025-01-06',
    timestamp: Date.now() - 1000000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Emitidas',
    driveUrl: '#'
  },
  {
    id: '9',
    cliente: 'Google Ireland',
    cif: 'IE-GOOG-02',
    importe: '-450,20€',
    numericAmount: -450.20,
    direccion: 'RECIBIDA',
    numeroDocumento: 'GGL-ADS-01',
    fechaDocumento: '2025-01-05',
    timestamp: Date.now() - 1100000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '10',
    cliente: 'Design Studio',
    cif: 'B44556677',
    importe: '+2.100,00€',
    numericAmount: 2100,
    direccion: 'EMITIDA',
    numeroDocumento: 'INV-2024-004',
    fechaDocumento: '2025-01-05',
    timestamp: Date.now() - 1200000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Emitidas',
    driveUrl: '#'
  },
  {
    id: '11',
    cliente: 'Slack Technologies',
    cif: 'US-SLACK-01',
    importe: '-8,25€',
    numericAmount: -8.25,
    direccion: 'RECIBIDA',
    numeroDocumento: 'SLCK-SUB-01',
    fechaDocumento: '2025-01-04',
    timestamp: Date.now() - 1300000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '12',
    cliente: 'WeWork Space',
    cif: 'ES-WE-001',
    importe: '-550,00€',
    numericAmount: -550.00,
    direccion: 'RECIBIDA',
    numeroDocumento: 'WE-RENT-JAN',
    fechaDocumento: '2025-01-03',
    timestamp: Date.now() - 1400000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '13',
    cliente: 'Marketing Agency',
    cif: 'B22334455',
    importe: '+1.200,00€',
    numericAmount: 1200,
    direccion: 'EMITIDA',
    numeroDocumento: 'INV-2024-005',
    fechaDocumento: '2025-01-02',
    timestamp: Date.now() - 1500000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Emitidas',
    driveUrl: '#'
  },
  {
    id: '14',
    cliente: 'LinkedIn Ireland',
    cif: 'IE-LINK-01',
    importe: '-150,00€',
    numericAmount: -150.00,
    direccion: 'RECIBIDA',
    numeroDocumento: 'LNK-PREM-01',
    fechaDocumento: '2025-01-01',
    timestamp: Date.now() - 1600000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  },
  {
    id: '15',
    cliente: 'Vueling Airlines',
    cif: 'ES-VUEL-01',
    importe: '-180,50€',
    numericAmount: -180.50,
    direccion: 'RECIBIDA',
    numeroDocumento: 'VLG-TRIP-BCN',
    fechaDocumento: '2025-01-01',
    timestamp: Date.now() - 1700000,
    status: 'success',
    ruta: 'My Drive/Contabilidad/2025/Enero/Gastos',
    driveUrl: '#'
  }
];

const HistoryItem: React.FC<{ item: InvoiceData }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const isSuccess = item.status === 'success';

  return (
    <div className="history-card">
      <div className="history-header" onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className={`status-icon ${isSuccess ? 'success' : 'error'}`}>
            {isSuccess ? '✓' : '✕'}
          </div>
          <div>
            <div className="client-name">{item.cliente}</div>
            <div className="date-text">{new Date(item.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="amount-badge">{item.importe}</div>
          <span style={{ fontSize: '10px', opacity: 0.5, transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▼</span>
        </div>
      </div>
      <div className={`details-panel ${expanded ? 'expanded' : ''}`}>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">CIF TERCERO</span>
            <span className="detail-value">{item.cif}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">TIPO</span>
            <span className="detail-value">{item.direccion}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">DOC</span>
            <span className="detail-value">{item.numeroDocumento}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">FECHA</span>
            <span className="detail-value">{item.fechaDocumento}</span>
          </div>
          <div className="detail-item" style={{ gridColumn: 'span 2' }}>
            <span className="detail-label">RUTA DRIVE</span>
            <span className="detail-value" style={{ fontSize: '10px', color: '#a5b4fc', wordBreak: 'break-all' }}>{item.ruta}</span>
          </div>
          <a href="#" className="drive-action-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4 object-contain" />
            📂 Abrir en Google Drive
          </a>
        </div>
      </div>
    </div>
  );
};

const InteractiveExtension = () => {
  const [view, setView] = useState<'metrics' | 'history' | 'config'>('metrics');
  const [history, setHistory] = useState<InvoiceData[]>(INITIAL_DATA);
  const [folderStructure, setFolderStructure] = useState('{cliente}/{tipo}/{año}/{mes}');

  // -- Metrics Calculation --
  const { totalInvoices, successRate, totalAmount, avgAmount, emitidas, recibidas, topClients, invoiceTypes } = useMemo(() => {
    const successItems = history.filter(i => i.status === 'success');
    const emitidasItems = successItems.filter(i => i.direccion === 'EMITIDA');
    const recibidasItems = successItems.filter(i => i.direccion !== 'EMITIDA');

    const sum = (items: InvoiceData[]) => items.reduce((acc, curr) => acc + Math.abs(curr.numericAmount), 0);
    const totalEmitidas = sum(emitidasItems);
    const totalRecibidas = sum(recibidasItems);
    const total = totalEmitidas + totalRecibidas;

    // Top Clients
    const clientTotals: Record<string, number> = {};
    successItems.forEach(i => {
      clientTotals[i.cliente] = (clientTotals[i.cliente] || 0) + Math.abs(i.numericAmount);
    });
    const sortedClients = Object.entries(clientTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return {
      totalInvoices: history.length,
      successRate: history.length ? Math.round((successItems.length / history.length) * 100) : 100,
      totalAmount: total,
      avgAmount: successItems.length ? total / successItems.length : 0,
      emitidas: { items: emitidasItems, total: totalEmitidas },
      recibidas: { items: recibidasItems, total: totalRecibidas },
      topClients: sortedClients,
      invoiceTypes: { emitidas: emitidasItems.length, recibidas: recibidasItems.length }
    };
  }, [history]);

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(2) + 'M€';
    if (amount >= 1000) return (amount / 1000).toFixed(1) + 'K€';
    return amount.toFixed(2) + '€';
  };

  const balance = emitidas.total - recibidas.total;

  return (
    <div id="extension-root" className="w-[520px] h-[640px] rounded-2xl shadow-2xl mx-auto">
      <style>{EXTENSION_STYLES}</style>
      <div className="bg-particles"></div>

      <div className="ext-container">
        {/* HEADER */}
        <div className="ext-header">
          <div className="header-row-1">
            <div className="logo-section">
              <img src="/logo.png" alt="DocuDash Pro" className="h-16 w-auto object-contain" />
              <div className="logo-text">
                <h1>DocuDash Pro</h1>
                <p>Hybrid AI Automation</p>
              </div>
            </div>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text">Operativo</span>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🎁</div>
              <div className="info-content">
                <div className="info-label">Período Beta</div>
                <div className="info-value">100 Gratis</div>
              </div>
            </div>
            <div className="info-card highlight">
              <div className="info-icon">📊</div>
              <div className="info-content">
                <div className="info-label">Procesadas</div>
                <div className="info-value">{history.length}/100</div>
              </div>
            </div>
            <div className="info-card" style={{ cursor: 'pointer' }}>
              <div className="info-icon">💬</div>
              <div className="info-content">
                <div className="info-label">Tu Opinión</div>
                <div className="info-value">Feedback</div>
              </div>
            </div>
          </div>

          <div className="progress-bar-elegant">
            <div className="progress-fill" style={{ width: `${Math.min((history.length / 100) * 100, 100)}%` }}></div>
          </div>

          <div className="tabs">
            <button
              className={`tab-btn ${view === 'metrics' ? 'active' : ''}`}
              onClick={() => setView('metrics')}
            >
              <span className="tab-icon">📊</span>
              <span>Métricas</span>
            </button>
            <button
              className={`tab-btn ${view === 'history' ? 'active' : ''}`}
              onClick={() => setView('history')}
            >
              <span className="tab-icon">📋</span>
              <span>Historial</span>
            </button>
            <button
              className={`tab-btn ${view === 'config' ? 'active' : ''}`}
              onClick={() => setView('config')}
            >
              <span className="tab-icon">⚙️</span>
              <span>Config</span>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-area">
          {view === 'metrics' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-value">{totalInvoices}</div>
                  <div className="metric-label">Total Facturas</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{successRate}%</div>
                  <div className="metric-label">Tasa Éxito</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{formatAmount(totalAmount)}</div>
                  <div className="metric-label">Importe Total</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{formatAmount(avgAmount)}</div>
                  <div className="metric-label">Promedio</div>
                </div>
              </div>

              <div className="dual-panels-container">
                <div className="metric-panel issued-panel">
                  <div className="panel-header">💰 Facturas Emitidas (Ingresos)</div>
                  <div className="panel-amount">{formatAmount(emitidas.total)}</div>
                  <div className="panel-count">{emitidas.items.length} facturas</div>
                  <div className="mini-stat">
                    <span>Promedio:</span>
                    <span>{formatAmount(emitidas.items.length ? emitidas.total / emitidas.items.length : 0)}</span>
                  </div>
                </div>
                <div className="metric-panel received-panel">
                  <div className="panel-header">🔥 Facturas Recibidas (Gastos)</div>
                  <div className="panel-amount">{formatAmount(recibidas.total)}</div>
                  <div className="panel-count">{recibidas.items.length} facturas</div>
                  <div className="mini-stat">
                    <span>Promedio:</span>
                    <span>{formatAmount(recibidas.items.length ? recibidas.total / recibidas.items.length : 0)}</span>
                  </div>
                </div>
              </div>

              <div className="balance-panel">
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  ⚖️ Balance Financiero
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: balance >= 0 ? '#10b981' : '#ef4444', marginBottom: '4px' }}>
                  {formatAmount(Math.abs(balance))}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                  {balance >= 0 ? 'POSITIVO 📈' : 'NEGATIVO 📉'}
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-title">📈 Top 5 Clientes</div>
                {topClients.map(([client, amount], idx) => (
                  <div className="bar-item" key={idx}>
                    <div className="bar-label">{client.substring(0, 12)}..</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(amount / (topClients[0]?.[1] || 1)) * 100}%` }}></div>
                    </div>
                    <div className="bar-value">{formatAmount(amount)}</div>
                  </div>
                ))}
              </div>

              <div className="chart-container">
                <div className="chart-title">📈 Facturas por Tipo</div>
                <div className="bar-item">
                  <div className="bar-label">Recibidas</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(invoiceTypes.recibidas / (history.length || 1)) * 100}%` }}></div>
                  </div>
                  <div className="bar-value">{invoiceTypes.recibidas}</div>
                </div>
                <div className="bar-item">
                  <div className="bar-label">Emitidas</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${(invoiceTypes.emitidas / (history.length || 1)) * 100}%` }}></div>
                  </div>
                  <div className="bar-value">{invoiceTypes.emitidas}</div>
                </div>
              </div>
            </div>
          )}

          {view === 'history' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button className="btn-export">
                📥 Descargar Reporte Excel
              </button>
              {history.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
              {history.length > 0 && (
                <button className="btn-secondary" style={{ marginTop: '12px' }}>
                  🗑️ Limpiar Historial
                </button>
              )}
            </div>
          )}

          {view === 'config' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-card">
                <div className="form-group">
                  <label className="form-label">📁 Estructura de Carpetas en Drive</label>
                  <select
                    className="form-select"
                    value={folderStructure}
                    onChange={(e) => setFolderStructure(e.target.value)}
                  >
                    <option value="{cliente}/{tipo}/{año}/{mes}">Cliente → Tipo → Año → Mes (Default)</option>
                    <option value="{año}/{mes}/{cliente}">Año → Mes → Cliente</option>
                  </select>
                  <div className="folder-structure-preview">
                    📂 AUTOMATIZACIÓN / [B12345678] - PROVEEDOR SA / Facturas_Recibidas / 2025 / 01_Enero
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">🏢 Nombre de tu Empresa</label>
                  <input type="text" className="form-input" defaultValue="Mi Empresa S.L." />
                </div>
                <div className="form-group">
                  <label className="form-label">🆔 CIF de tu Empresa</label>
                  <input type="text" className="form-input" defaultValue="B12345678" />
                </div>
                <div className="form-group">
                  <label className="form-label">📂 Google Drive Token</label>
                  <input type="password" className="form-input" placeholder="Token OAuth2" />
                </div>

                <button className="btn-primary">💾 Guardar Configuración</button>
                <button className="btn-primary" style={{ marginTop: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4 object-contain" />
                  🔗 Vincular Google Drive
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 🔄 SIMPLE WORKFLOW COMPONENT
// ==========================================

const SimpleWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5); // 5 states: 0,1,2,3, 4(reset pause)
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Use a display step that caps at 3 (index of last item) to hold the final state a bit
  const displayStep = activeStep > 3 ? 3 : activeStep;

  const steps = [
    { img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg", label: 'Gmail', desc: 'Recepción' },
    { icon: FileText, label: 'Factura', desc: 'Detección' },
    { icon: Zap, label: 'Procesar', desc: 'IA Auto' },
    { img: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg", label: 'Drive', desc: 'Guardado' },
  ];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="relative flex justify-between items-start">

        {/* Track Line - Centered relative to w-16 container (center is 2rem/32px/left-8) */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-white/10 -translate-y-1/2 z-0 rounded-full">
          {/* Active Line Container */}
          <div className="h-full w-full relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(displayStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx <= displayStep;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-3 w-16">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                  ? 'bg-[#151a25] border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110'
                  : 'bg-[#0f0c29] border-white/10 text-gray-600 scale-100'
                  }`}
              >
                {s.img ? (
                  <img src={s.img} alt={s.label} className={`w-5 h-5 object-contain ${isActive ? 'animate-pulse' : ''}`} />
                ) : (
                  Icon && <Icon size={18} className={isActive ? 'animate-pulse' : ''} />
                )}
              </div>
              <div className="text-center">
                <div className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 🚀 LANDING PAGE COMPONENTS
// ==========================================

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-2 md:top-6 left-1/2 -translate-x-1/2 w-[96%] md:w-[85%] max-w-5xl z-50 transition-all duration-300">
      <div className="relative rounded-2xl md:rounded-full bg-[#1B2535]/90 backdrop-blur-xl border border-blue-500/20 shadow-2xl overflow-hidden ring-1 ring-white/10">

        {/* Header Principal */}
        <div className="px-3 py-2 md:px-6 md:py-3 flex items-center justify-between">

          {/* 1. LOGO (Izquierda) */}
          <a href="#" className="flex items-center space-x-2 rtl:space-x-reverse min-w-[140px]">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
            <span className="self-center text-sm md:text-lg font-bold whitespace-nowrap tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
              DocuDash Pro
            </span>
          </a>
          {/* 2. MENÚ DESKTOP (Centro) */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex font-medium space-x-8 text-sm px-6 py-2 rounded-full bg-white/5 border border-white/5">
              <li>
                <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                  Características
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('drive-integration')} className="text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                  Drive
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                  Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('installation')} className="text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                  Instalación
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white hover:text-blue-400 transition-colors">
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          {/* 3. BOTÓN & MENÚ MÓVIL (Derecha) */}
          <div className="flex items-center gap-2 md:gap-3 min-w-[140px] justify-end">
            {/* Botón CTA - Desktop */}
            <a
              href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold rounded-full text-xs md:text-sm px-5 py-2.5 transition-all shadow-lg shadow-blue-500/25 border border-white/10 hover:scale-105"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Chrome" className="w-4 h-4" />
              Instalar Gratis
            </a>
            {/* Botón Menú - Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Menú Móvil Expandible */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-3 pb-3 border-t border-white/5 bg-[#161e2c]">
            <ul className="flex flex-col space-y-1 pt-3">
              <li>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Características</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('drive-integration')} className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Drive</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Privacidad</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('installation')} className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Instalación</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Contacto</button>
              </li>
              <li className="pt-2">
                <a
                  href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 font-bold rounded-lg text-sm px-5 py-3 transition-all shadow-lg shadow-blue-500/20"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" alt="Chrome" className="w-4 h-4" />
                  Instalar Gratis
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SectionDivider = () => (
  <div className="relative w-full overflow-hidden">
    {/* Versión Móvil - Completamente integrada sin padding visible */}
    <div className="md:hidden relative h-px w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>

    {/* Versión Desktop - Original con glow */}
    <div className="hidden md:block relative h-px w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-24 bg-blue-500/20 blur-[60px]"></div>
    </div>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-brand-blue" />,
      title: "Extracción IA Inteligente",
      desc: "Detecta CIF, Fecha, Importe Total y Proveedor con 99% de precisión. Analiza el contenido real del PDF, no solo el nombre.",
      benefit: "99% precisión"
    },
    {
      icon: <FolderOpen className="w-8 h-8 text-brand-purple" />,
      title: "Organización Dinámica",
      desc: "Elige tu estructura: /Año/Mes/Cliente o /Cliente/Año. Tus facturas siempre ordenadas como tú quieras.",
      benefit: "5 estructuras"
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-pink-500" />,
      title: "Reportes Excel Instantáneos",
      desc: "Cierre trimestral en 1 clic. Exporta todo el historial con columnas detalladas para tu gestor o contable.",
      benefit: "1-clic export"
    },
    {
      icon: <Mail className="w-8 h-8 text-yellow-500" />,
      title: "Emitidas vs Recibidas",
      desc: "Diferencia automáticamente entre ingresos y gastos analizando el contexto del correo y la factura.",
      benefit: "Auto-detección"
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
      title: "Sync Google Drive",
      desc: "Integración nativa OAuth2. Los archivos aparecen en tu nube segundos después de procesarlos.",
      benefit: "Tiempo real"
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-500" />,
      title: "Setup en 30 Segundos",
      desc: "Sin configuraciones complejas. Instala, conecta Google y empieza a ahorrar tiempo inmediatamente.",
      benefit: "30 seg setup"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Texture & Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0B0F19] to-[#0B0F19]"></div>
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold tracking-wider uppercase mb-4">
            Funcionalidades
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Todo lo que necesitas para tu contabilidad</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Deja que la tecnología haga el trabajo aburrido. Enfócate en hacer crecer tu negocio.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-[#151A25]/50 border border-white/5 p-4 md:p-8 rounded-2xl hover:border-brand-blue/30 hover:bg-[#151A25] hover:shadow-2xl hover:shadow-brand-blue/5 hover:-translate-y-1 transition-all duration-300 group backdrop-blur-sm relative">
              <div className="mb-4 md:mb-6 p-2 md:p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform">
                {f.img ? (
                  <img src={f.img} alt={f.title} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                ) : (
                  f.icon
                )}
              </div>
              <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-xs md:text-sm mb-3">
                {f.desc}
              </p>
              {f.benefit && (
                <span className="inline-block text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-full border border-brand-blue/20">
                  {f.benefit}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 📊 TAX DASHBOARD SECTION (IVA)
// ==========================================

const TaxDashboardSection = () => {
  const categories = [
    { name: 'SOFTWARE', amount: 450.20, color: 'from-blue-500 to-blue-600', percent: 40 },
    { name: 'ADS', amount: 320.00, color: 'from-purple-500 to-purple-600', percent: 28 },
    { name: 'OPERATIVA', amount: 180.50, color: 'from-green-500 to-green-600', percent: 16 },
    { name: 'PROFESIONALES', amount: 150.00, color: 'from-yellow-500 to-yellow-600', percent: 13 },
    { name: 'OTROS', amount: 34.30, color: 'from-gray-500 to-gray-600', percent: 3 },
  ];

  return (
    <section id="tax-dashboard" className="py-12 md:py-24 bg-[#0f0c29] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left Column: Text */}
          <div className="space-y-6">
            <div className="w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              NUEVO en v2.2.0
            </div>

            <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight">
              Prepara tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Modelo 303</span> en segundos
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed">
              DocuDash Pro calcula automáticamente tu <strong className="text-white">IVA Repercutido</strong> (facturas emitidas) y <strong className="text-white">IVA Soportado</strong> (facturas recibidas). Visualiza tu resultado estimado antes de la declaración.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={20} />
                <span><strong className="text-white">Dashboard de IVA trimestral</strong> — Ve de un vistazo cuánto debes o te deben.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={20} />
                <span><strong className="text-white">Categorización automática</strong> — IA que clasifica en ADS, SOFTWARE, OPERATIVA, etc.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={20} />
                <span><strong className="text-white">Gráfico de gastos</strong> — Visualiza dónde va tu dinero cada trimestre.</span>
              </li>
            </ul>

            <div className="pt-4">
              <a
                href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium hover:underline underline-offset-4"
              >
                Nunca más te pille Hacienda por sorpresa <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Dashboard */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-[#151a25] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Panel de Impuestos</h4>
                    <p className="text-xs text-gray-500">Q1 2025 • Enero - Marzo</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                  ACTIVO
                </span>
              </div>

              {/* IVA Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">IVA Repercutido</p>
                  <p className="text-xl md:text-2xl font-bold text-green-400">+2.205,00 €</p>
                  <p className="text-xs text-gray-500 mt-1">5 facturas emitidas</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">IVA Soportado</p>
                  <p className="text-xl md:text-2xl font-bold text-red-400">-625,85 €</p>
                  <p className="text-xs text-gray-500 mt-1">10 facturas recibidas</p>
                </div>
              </div>

              {/* Resultado */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Resultado Estimado Q1</p>
                <p className="text-2xl md:text-3xl font-bold text-white">A Ingresar: <span className="text-indigo-400">1.579,15 €</span></p>
                <p className="text-xs text-gray-500 mt-2">Fecha límite Modelo 303: 20 Abril 2025</p>
              </div>

              {/* Category Chart */}
              <div className="space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Gastos por Categoría</p>
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 w-20 text-right font-medium">{cat.name}</span>
                    <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-700`}
                        style={{ width: `${cat.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-16">{cat.amount.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const DriveIntegrationSection = () => {
  const [activeOption, setActiveOption] = useState(0);

  // Enhanced options with visual structure meta-data
  const options = [
    {
      id: 0,
      structure: ['client', 'type', 'year', 'month'],
      levels: ["TechCorp Solutions", "Emitidas", "2025", "Enero"]
    },
    {
      id: 1,
      structure: ['year', 'month', 'client', 'type'],
      levels: ["2025", "Enero", "TechCorp Solutions", "Emitidas"]
    },
    {
      id: 2,
      structure: ['type', 'client', 'year', 'month'],
      levels: ["Emitidas", "TechCorp Solutions", "2025", "Enero"]
    },
    {
      id: 3,
      structure: ['year', 'type', 'client'],
      levels: ["2025", "Emitidas", "TechCorp Solutions"]
    },
    {
      id: 4,
      structure: ['client', 'year', 'month'],
      levels: ["TechCorp Solutions", "2025", "Enero"]
    },
  ];

  const currentLevels = options[activeOption].levels;

  // Visual Chip Component
  const StructureChip = ({ type }: { type: string }) => {
    // Ultra-subtle colors: 5% opacity bg, 10% opacity border, 300-weight text
    const styles: Record<string, { bg: string, text: string, border: string, icon: React.ReactNode }> = {
      client: {
        bg: 'bg-indigo-500/[0.05]',
        text: 'text-indigo-300',
        border: 'border-indigo-500/10',
        icon: <User size={12} />
      },
      year: {
        bg: 'bg-amber-500/[0.05]',
        text: 'text-amber-300',
        border: 'border-amber-500/10',
        icon: <Calendar size={12} />
      },
      month: {
        bg: 'bg-emerald-500/[0.05]',
        text: 'text-emerald-300',
        border: 'border-emerald-500/10',
        icon: <CalendarDays size={12} />
      },
      type: {
        bg: 'bg-violet-500/[0.05]',
        text: 'text-violet-300',
        border: 'border-violet-500/10',
        icon: <FileType size={12} />
      },
    };

    const style = styles[type] || styles.client;
    const label = type === 'client' ? 'Cliente' : type === 'year' ? 'Año' : type === 'month' ? 'Mes' : 'Tipo';

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${style.bg} ${style.text} border ${style.border} transition-transform group-hover/card:scale-105`}>
        {style.icon}
        {label}
      </span>
    );
  };

  // Helper to visualize nesting based on levels
  const renderFolderTree = (levels: string[], depth = 0) => {
    if (depth >= levels.length) {
      // Base case: render file
      return (
        <div className={`ml-2 md:ml-4 mt-1 md:mt-2 border-l-2 border-blue-500/50 pl-2 md:pl-4 py-0.5 relative animate-in fade-in slide-in-from-left-2 duration-300`} style={{ animationDelay: `${depth * 100}ms` }}>
          {/* Active Indicator for file level */}
          <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-[#151a25] border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

          <div className="bg-white/5 rounded-lg p-2 md:p-3 border border-white/10 space-y-1 md:space-y-2 mt-1 md:mt-2">
            <div className="flex items-center justify-between group/file p-1.5 md:p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-red-500/20 text-red-400">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white font-medium truncate">2025-01-15_INV-001.pdf</div>
                  <div className="text-[10px] text-gray-500">2.5 MB • Hace 2 min</div>
                </div>
              </div>
              <MoreVertical size={14} className="text-gray-600 group-hover/file:text-white" />
            </div>

            <div className="flex items-center justify-between group/file p-1.5 md:p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-red-500/20 text-red-400">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white font-medium truncate">2025-01-20_INV-002.pdf</div>
                  <div className="text-[10px] text-gray-500">1.8 MB • Recién añadido</div>
                </div>
              </div>
              <CheckCircle2 size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      );
    }

    const currentName = levels[depth];
    // Assign specific colors based on level depth for visual hierarchy
    const colors = [
      { icon: "text-blue-500", fill: "fill-blue-500/20" },
      { icon: "text-purple-500", fill: "fill-purple-500/20" },
      { icon: "text-yellow-500", fill: "fill-yellow-500/20" },
      { icon: "text-green-500", fill: "fill-green-500/20" }
    ];
    const color = colors[depth % colors.length];

    // Determine badge text based on common folder names for context
    let badge = "";
    if (currentName.includes("202")) badge = "Año";
    else if (["Enero", "Febrero"].includes(currentName)) badge = "Mes";
    else if (["Emitidas", "Recibidas"].includes(currentName)) badge = "Tipo";
    else badge = "Cliente"; // Default assumption

    return (
      <div className={`ml-0 ${depth > 0 ? 'ml-2 md:ml-4 mt-1 md:mt-2 border-l-2 border-white/10 pl-2 md:pl-4 py-0.5 md:py-1' : ''} animate-in fade-in slide-in-from-left-2 duration-300`} style={{ animationDelay: `${depth * 75}ms` }}>
        <div className="flex items-center gap-2 text-gray-300 hover:text-white group/folder cursor-pointer py-0.5">
          <FolderOpen size={18} className={`${color.icon} ${color.fill}`} />
          <span className="text-sm font-medium">{currentName}</span>
          <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-gray-500 uppercase tracking-wider text-[9px]">{badge}</span>
        </div>
        {renderFolderTree(levels, depth + 1)}
      </div>
    );
  };

  return (
    <section id="drive-integration" className="py-12 md:py-24 bg-[#0f0c29] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 md:gap-16 items-stretch relative z-10">

        {/* Left Column: Explanation */}
        <div className="space-y-8 flex flex-col h-full">
          <div className="w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
            {/* Replaced with generic Cloud icon as requested */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4 object-contain" />
            Sincronización en Tiempo Real
          </div>

          <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight">
            Tu Google Drive, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Perfectamente Organizado</span>
          </h2>

          <p className="text-lg text-gray-400 leading-relaxed">
            Personaliza cómo quieres que DocuDash Pro organice tus archivos. Elige la estructura que mejor se adapte a tu flujo de trabajo contable.
          </p>

          {/* Interactive Configuration Selector */}
          <div className="relative group flex-1">
            {/* Glow Effect matching the Right Panel */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-[#151a25] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">

              {/* Window Header - Matched Style */}
              <div className="bg-[#1e2330] border-b border-white/10 p-3 md:p-4 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Settings size={14} className="text-emerald-400" />
                  <span>Configuración</span>
                </div>
                <div className="w-10"></div> {/* Spacer for visual balance */}
              </div>

              <div className="p-2 space-y-2 overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveOption(opt.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group/card border
                      ${activeOption === opt.id
                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                      }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {opt.structure.map((part, index) => (
                        <React.Fragment key={index}>
                          <StructureChip type={part} />
                          {index < opt.structure.length - 1 && (
                            <ChevronRight size={12} className={`text-gray-600 ${activeOption === opt.id ? 'text-emerald-500' : ''}`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    {activeOption === opt.id && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 italic">
            <Layout size={16} />
            <span>La vista previa a la derecha se actualiza automáticamente.</span>
          </div>
        </div>

        {/* Right Column: Visual Demo */}
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          {/* Mock Drive Interface */}
          <div className="relative bg-[#151a25] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px] md:min-h-[500px] flex flex-col">

            {/* Window Header */}
            <div className="bg-[#1e2330] border-b border-white/10 p-2 md:p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              <div className="flex-1 mx-4 md:mx-8">
                <div className="bg-[#0f0c29] h-8 rounded-lg border border-white/5 flex items-center px-3 text-xs text-gray-500 gap-2">
                  <Cloud size={14} />
                  <span className="hidden sm:inline">Buscar en Drive...</span>
                  <span className="sm:hidden">Buscar...</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">YO</div>
            </div>

            {/* Window Body */}
            <div className="flex flex-1 overflow-hidden">

              {/* Sidebar - HIDDEN ON MOBILE */}
              <div className="w-48 border-r border-white/5 p-4 hidden md:block bg-[#1a1f2b]">
                {/* Logo Replaced with generic HardDrive icon as requested */}
                <div className="flex items-center gap-3 mb-8 px-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-8 h-8 object-contain" />
                  <span className="text-xl font-medium text-white tracking-tight">Drive</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-medium">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4 object-contain" /> Mi Unidad
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <Cloud size={16} /> Ordenadores
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-300 text-sm font-medium">
                    <Star size={16} /> Destacados
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-[#151a25] p-4 md:p-6 overflow-y-auto flex flex-col">

                {/* Breadcrumbs - Dynamic with wrapping */}
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 mb-3 md:mb-6 pb-2 md:pb-4 border-b border-white/5">
                  <span className="hover:text-white cursor-pointer">Mi Unidad</span>
                  <ChevronRight size={14} />
                  <span className="hover:text-white cursor-pointer">DocuDash</span>
                  {currentLevels.slice(0, 2).map((level, i) => (
                    <React.Fragment key={i}>
                      <ChevronRight size={14} />
                      <span className="hover:text-white cursor-pointer whitespace-nowrap">{level}</span>
                    </React.Fragment>
                  ))}
                  <ChevronRight size={14} />
                  <span className="text-white font-medium">...</span>
                </div>

                {/* Folder Structure Visualization */}
                <div className="space-y-2">
                  {renderFolderTree(currentLevels)}
                </div>

                {/* Fill Empty Space with Drop Zone Visual */}
                <div className="flex-1 min-h-[100px] mt-6 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center text-gray-600 gap-2 transition-colors hover:border-white/10 hover:bg-white/5 group/dropzone opacity-60 hover:opacity-100">
                  <div className="p-3 bg-[#1e2330] rounded-full group-hover/dropzone:scale-110 transition-transform shadow-lg">
                    <Cloud size={20} className="text-gray-500" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">Arrastra archivos aquí</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-[#0B0F19] relative">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-[#151a25] to-[#11141d] border border-white/10 rounded-3xl p-5 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-2xl">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 text-green-400 font-semibold mb-2">
              <ShieldCheck size={24} />
              <span>Privacidad Primero</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tus datos nunca salen de tu entorno seguro</h2>
            <p className="text-gray-400">
              A diferencia de otras herramientas SaaS, DocuDash Pro funciona localmente en tu navegador.
              Los PDFs se procesan en memoria y se envían directamente a <strong>tu</strong> Google Drive mediante canales cifrados (TLS 1.3).
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-brand-purple" size={18} /> Sin almacenamiento intermedio de documentos.
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="text-brand-purple" size={18} /> Cifrado de grado bancario AES-256.
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <CheckCircle2 className="text-brand-purple shrink-0 mt-1" size={18} />
                <span>
                  <strong className="text-white">Anonimización de Datos Sensibles:</strong> Antes del procesamiento, aplicamos filtros para anonimizar datos sensibles como IBAN, números de teléfono y direcciones personales, asegurando que la IA solo analice la información estructural y fiscal necesaria.
                </span>
              </li>
            </ul>
            <div className="pt-4">
              <a href="/privacy.html" className="inline-flex items-center gap-2 text-sm text-brand-blue hover:text-blue-300 transition-colors font-medium hover:underline underline-offset-4">
                Nuestra política de privacidad <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center py-6 md:py-0">
            <Lock className="text-[#151a25] drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] stroke-brand-blue w-32 h-32 md:w-48 md:h-48" strokeWidth={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
};

const InstallationGuide = () => {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-white" />,
      title: "Iniciar Instalación",
      desc: "Haga clic en el botón 'Instalar Gratis' para acceder a la Chrome Web Store.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Download className="w-8 h-8 text-white" />,
      title: "Añadir a Chrome",
      desc: "Pulse el botón 'Añadir a Chrome' y confirme la instalación.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Pin className="w-8 h-8 text-white" />,
      title: "Fijar Extensión",
      desc: "Pulse el icono de la chincheta para fijar DocuDash Pro en su barra.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
      title: "Ejecutar en Gmail",
      desc: "Abra un correo con factura y active la extensión para procesar.",
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section id="installation" className="py-12 md:py-24 bg-[#0f0c29] relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand-purple text-xs font-semibold tracking-wider uppercase mb-4">
            Onboarding Express
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Instalación en 4 Pasos</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sin configuraciones complejas de servidor. Estarás operativo en menos de 60 segundos.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) - Improved with Dashed style behind cards */}
          <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-white/10 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Card Container */}
                <div className="h-full bg-[#151a25]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 relative overflow-hidden transition-all duration-300 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/10 hover:-translate-y-2">

                  {/* Top Glow Border Effect */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Large Background Number */}
                  <div className="absolute -right-4 -top-6 text-6xl md:text-8xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
                    0{idx + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-4 md:mb-6 flex justify-center md:justify-start">
                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#151a25] rounded-[14px] flex items-center justify-center relative overflow-hidden group-hover:bg-opacity-90 transition-all">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-20`}></div>
                        {step.img ? (
                          <img src={step.img} alt={step.title} className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10" />
                        ) : (
                          <div className="relative z-10 transform scale-75 md:scale-100">
                            {step.icon}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center md:text-left">
                    <h3 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-brand-blue transition-colors">{step.title}</h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
            <Chrome size={16} />
            Ver documentación completa de instalación
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "¿Es seguro dar acceso a mi Gmail?",
      a: "Totalmente. DocuDash Pro NO tiene acceso a leer tus correos. Solo procesa los archivos adjuntos que TÚ decides procesar haciendo clic. Usamos OAuth2 oficial de Google."
    },
    {
      q: "¿Necesito configurar algo técnico?",
      a: "No. Solo instala la extensión, conecta tu cuenta de Google y empieza a usar. Cero configuraciones técnicas."
    },
    {
      q: "¿Puedo exportar los datos para mi gestoría?",
      a: "Sí. Descarga un Excel con todas las facturas: Cliente, NIF, Base, IVA, Total, Categoría y enlace al archivo en Drive."
    },
    {
      q: "¿Cómo me ayuda con el Modelo 303?",
      a: "Calcula automáticamente tu IVA Repercutido e IVA Soportado, mostrándote el resultado estimado a pagar cada trimestre."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-24 bg-[#0B0F19] relative">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-semibold tracking-wider uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Preguntas Frecuentes</h2>
          <p className="text-gray-400 mt-2">Todo lo que necesitas saber antes de empezar</p>
        </div>
        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <details key={idx} className="group bg-[#151a25]/50 border border-white/5 rounded-xl backdrop-blur-sm hover:border-white/10 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between p-4 md:p-6 text-sm md:text-lg font-medium text-white transition-colors group-hover:text-brand-blue">
                <span className="pr-4">{item.q}</span>
                <span className="transition group-open:rotate-180 shrink-0"><ChevronDown size={20} /></span>
              </summary>
              <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-400 leading-relaxed text-sm">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0f0c29] border-t border-white/5 py-12 relative overflow-hidden">
      {/* Background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="DocuDash Pro" className="h-20 w-auto object-contain" />
              <span className="text-xl font-bold text-white tracking-tight">DocuDash Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Automatización inteligente de facturas para freelancers y pymes. Recupera tu tiempo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue border border-white/10">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email</span>
                <a href="mailto:info@docudash.es" className="text-sm text-white hover:text-brand-blue transition-colors">info@docudash.es</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue border border-white/10">
                <Linkedin size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">LinkedIn</span>
                <a href="https://www.linkedin.com/in/leonardo-de-haro-garcia-1814383a6" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-brand-blue transition-colors italic">Conectar en LinkedIn</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-blue border border-white/10">
                <Chrome size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Tienda</span>
                <a href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-brand-blue transition-colors">Ver en Chrome Store</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-gray-600 text-xs">
            <span>© {new Date().getFullYear()} DocuDash Pro. Todos los derechos reservados.</span>
            <span className="hidden sm:inline-block w-px h-3 bg-white/10"></span>
            <span className="hidden sm:inline-block text-brand-blue font-semibold">v2.2.0</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-gray-500">
            <a href="/terms.html" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="/privacy.html" className="hover:text-white transition-colors">Privacidad</a>
            <a href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Star size={10} className="fill-yellow-500 text-yellow-500" /> Valorar en Chrome Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex items-center justify-center bg-[#0B0F19]">
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

        {/* Floating Orbs with movement */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-transparent rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/25 via-indigo-500/15 to-transparent rounded-full blur-[80px] animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-gradient-to-l from-pink-500/20 via-purple-400/10 to-transparent rounded-full blur-[60px] animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute bottom-[30%] left-[5%] w-[250px] h-[250px] bg-gradient-to-r from-cyan-500/15 to-transparent rounded-full blur-[50px] animate-pulse"></div>

        {/* Animated Gradient Lines - Framing the main text */}
        <div className="absolute top-[22%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse"></div>
        <div className="absolute top-[55%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Sparkle Particles */}
        <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[75%] left-[25%] w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[15%] left-[60%] w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full blur-[60px]"></div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section ABOVE top line - Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            Extensión para Chrome & Brave
          </div>
        </div>

        {/* Section BETWEEN lines - Main content */}
        <div className="text-center py-8">
          {/* Main Headline */}
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1]">
              Tus facturas en
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-pink-500">Piloto Automático</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Tu agente administrativo con IA que organiza automáticamente tus facturas de
            <span className="inline-flex items-center gap-1.5 mx-1.5 text-white font-medium">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-5 h-5" /> Gmail
            </span>
            a
            <span className="inline-flex items-center gap-1.5 mx-1.5 text-white font-medium">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-5 h-5" /> Drive
            </span>
            y te <span className="text-white font-medium">ahorra +5 horas cada trimestre</span>.
          </p>
        </div>

        {/* Section BELOW bottom line - CTA & Social Proof */}
        <div className="text-center mt-12 space-y-8">
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <a
              href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-10 py-4 rounded-full transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/10 hover:-translate-y-1 font-semibold text-lg overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
                alt="Chrome"
                className="w-6 h-6 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <span>Instalar Gratis</span>
              <ChevronRight size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Ver Funcionalidades</span>
              <ArrowRight size={18} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck size={18} className="text-green-500" />
              <span>Datos 100% privados</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-medium">5.0 en Chrome Store</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/20"></div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap size={18} className="text-brand-blue" />
              <span>Listo en 30 segundos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none"></div>
    </section>
  );
};

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Ocultar si el usuario está en el hero o muy arriba
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToInstallation = () => {
    const element = document.getElementById('installation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="https://chromewebstore.google.com/detail/mlbhcjeajpgihflpoghpfannfbakfnlo?utm_source=item-share-cb"
      target="_blank"
      rel="noopener noreferrer"
      className={`sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
    >
      <div className="flex items-center gap-2 bg-gradient-to-br from-[#0066CC] via-[#0077ED] to-[#0088FF] text-white px-6 py-3 rounded-full shadow-2xl shadow-blue-500/60 border border-white/20">
        <Chrome size={18} />
        <span className="font-bold text-sm">Instalar Extensión</span>
      </div>
    </a>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Carlos Méndez",
      role: "Freelance Marketing",
      text: "Antes perdía horas bajando facturas para el trimestre. Ahora DocuDash lo hace solo mientras duermo. Literalmente me ha devuelto mis domingos.",
      initials: "CM",
      color: "bg-blue-500"
    },
    {
      name: "Laura García",
      role: "Dueña de Tienda de Ropa",
      text: "No entiendo de tecnología, pero esto es facilísimo. Me llegan las facturas de proveedores al correo y aparecen solas en mi Drive. Una maravilla.",
      initials: "LG",
      color: "bg-purple-500"
    },
    {
      name: "Luis H.",
      role: "Usuario Real",
      text: "Me la instalé para probarla sin muchas expectativas la verdad, es simple y fácil de usar y me ahorra tiempo, y sobre todo, ya tengo todas las facturas día a día organizadas en Drive.",
      initials: "LH",
      color: "bg-green-500"
    },
    {
      name: "Marta Ruiz",
      role: "Abogada",
      text: "Mi gestoría me pedía siempre las facturas a última hora. Ahora les he compartido la carpeta de Drive y ya no me persiguen. Paz mental total.",
      initials: "MR",
      color: "bg-pink-500"
    },
    {
      name: "Javier Sola",
      role: "Fontanero",
      text: "Lo uso desde el móvil. Me mandan la factura de materiales al correo y yo me olvido. Al final del trimestre está todo ordenado por fecha.",
      initials: "JS",
      color: "bg-orange-500"
    },
    {
      name: "Ana Belén",
      role: "Diseñadora Gráfica",
      text: "Lo mejor es que es gratis y privado. Probé otras apps que costaban 20€ al mes y hacían lo mismo. DocuDash es simple y funciona.",
      initials: "AB",
      color: "bg-teal-500"
    }
  ];

  return (
    <section className="py-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-4">
            <Star size={12} className="fill-yellow-400" />
            100% Gratis de por Vida
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Personas reales que ya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500">Ahorran Tiempo</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Autónomos, dueños de negocios y profesionales que han dejado de pelearse con las facturas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-[#151a25] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/10">
              <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{review.name}</h4>
                  <p className="text-brand-blue text-sm font-medium">{review.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden font-sans">
      <Navbar />
      <FloatingCTA />
      <Hero />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <TaxDashboardSection />
      <SectionDivider />
      <DriveIntegrationSection />
      <SectionDivider />
      <SecuritySection />
      <SectionDivider />
      <InstallationGuide />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;