import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, Loader2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { analyzeUploadedDocument } from '../../services/aiService';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function DocumentUploadModal({
  isOpen,
  onClose,
  targetDoc = null,
  targetApprovalContext = null
}) {
  const { uploadDocument, showToast } = useApp();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (file) => {
    if (!file) return;
    setSelectedFile(file);
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeUploadedDocument(file, targetApprovalContext || targetDoc?.relatedApproval);
      setAiAnalysis(analysis);
    } catch (err) {
      showToast("Analysis Error", "Failed to parse document preview", "danger");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmUpload = () => {
    if (!targetDoc) {
      onClose();
      return;
    }
    uploadDocument(targetDoc.id || targetDoc.docId, {
      fileName: selectedFile?.name || "Uploaded_Document.pdf",
      fileSize: `${((selectedFile?.size || 2400000) / (1024 * 1024)).toFixed(2)} MB`
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Upload ${targetDoc?.name || 'Document'}`}
      subtitle={targetApprovalContext ? `Linked to ${targetApprovalContext}` : "Supported formats: PDF, PNG, JPG, CAD (Max 10 MB)"}
      maxWidth="max-w-xl"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={!selectedFile || isAnalyzing}
            icon={Upload}
            onClick={handleConfirmUpload}
          >
            Confirm & Link Document
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Dropzone Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
          }}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-[#245C3A] bg-[#EBF8E5]'
              : 'border-[#D1D9D0] hover:border-[#245C3A] bg-[#FAFBF9]'
          }`}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <input
            id="file-upload-input"
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.dwg"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
            }}
          />

          <div className="w-10 h-10 rounded-full bg-[#F1F4EE] text-[#245C3A] flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5" />
          </div>

          <p className="text-sm font-semibold text-[#18201B]">
            {selectedFile ? selectedFile.name : 'Click to select or drag & drop document file'}
          </p>
          <p className="text-xs text-[#839187] mt-1">
            Official PDF scan with registered stamp or authorized digital signature
          </p>
        </div>

        {/* AI Validation Assistant Box */}
        {isAnalyzing && (
          <div className="p-4 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-[#245C3A] animate-spin shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-[#18201B]">AI Document Scrutiny Assistant active</p>
              <p className="text-[#839187]">Validating layout scale, official seals, and statutory tags...</p>
            </div>
          </div>
        )}

        {aiAnalysis && !isAnalyzing && (
          <div className="p-4 bg-[#EBF8E5] border border-[#D5EED0] rounded-xl space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#245C3A]" />
                <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider">
                  AI Validation Check Passed
                </span>
              </div>
              <span className="text-[10px] font-bold bg-white text-[#245C3A] px-2 py-0.5 rounded border border-[#D5EED0]">
                {aiAnalysis.confidenceScore}
              </span>
            </div>

            <p className="text-xs text-[#18201B] font-medium leading-relaxed">
              {aiAnalysis.validationMessage}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#D5EED0]">
              <div>
                <span className="text-[#58655C]">Detected Doc: </span>
                <span className="font-bold text-[#18201B]">{aiAnalysis.detectedType}</span>
              </div>
              <div>
                <span className="text-[#58655C]">Target: </span>
                <span className="font-bold text-[#18201B]">{aiAnalysis.matchedApproval}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
