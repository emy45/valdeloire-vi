import { useState, useEffect, useRef, useCallback } from "react";
import { projectId } from "/utils/supabase/info";
import { getSupabaseClient } from "/utils/supabase/client";
import { X, Upload, Copy, Trash2, Check, Loader, Image as ImageIcon } from "lucide-react";

interface MediaImage {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (url: string) => void; // undefined = standalone mode (médiathèque page)
}

async function getToken() {
  const supabase = getSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ?? "";
}

export function MediaLibraryModal({ isOpen, onClose, onSelect }: Props) {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/images`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setImages(data.images || []);
    } catch (e) {
      console.error("Failed to fetch images", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchImages();
  }, [isOpen, fetchImages]);

  const uploadFiles = async (files: FileList | File[]) => {
    const token = await getToken();
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/upload-image`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd }
        );
      }
      await fetchImages();
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) uploadFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Supprimer cette image ?")) return;
    const token = await getToken();
    setDeletingName(name);
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-45b957fb/images/${encodeURIComponent(name)}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      setImages((prev) => prev.filter((img) => img.name !== name));
    } finally {
      setDeletingName(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  if (!isOpen) return null;

  const isModal = !!onSelect;

  const content = (
    <div className={isModal ? "flex flex-col h-full max-h-[80vh]" : "flex flex-col"}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-900">Médiathèque</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-[#001e40] text-white px-4 py-2 rounded-lg hover:bg-[#001429] transition-colors text-sm font-medium disabled:opacity-50"
          >
            {uploading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {uploading ? "Upload…" : "Ajouter des images"}
          </button>
          {isModal && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Drop zone + grid */}
      <div
        className="flex-1 overflow-y-auto p-6"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 z-10 bg-[#001e40]/10 border-4 border-dashed border-[#001e40] rounded-xl flex items-center justify-center pointer-events-none">
            <p className="text-[#001e40] font-semibold text-lg">Déposer les fichiers ici</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader className="w-8 h-8 text-[#001e40] animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-[#001e40] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">Aucune image — cliquez ou glissez pour uploader</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.name}
                className={`group relative bg-slate-100 rounded-xl overflow-hidden border-2 transition-all ${
                  onSelect ? "cursor-pointer hover:border-[#001e40]" : "border-transparent hover:border-slate-300"
                }`}
                onClick={() => onSelect?.(img.url)}
              >
                <div className="aspect-square">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  {onSelect && (
                    <div className="flex justify-center items-center h-full">
                      <span className="bg-white text-[#001e40] text-xs font-semibold px-3 py-1.5 rounded-full">
                        Insérer
                      </span>
                    </div>
                  )}

                  <div className="flex justify-end gap-1 absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleCopy(img.url); }}
                      className="p-1.5 bg-white/90 rounded-lg text-slate-700 hover:bg-white transition-colors"
                      title="Copier l'URL"
                    >
                      {copiedUrl === img.url ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleDelete(img.name); }}
                      disabled={deletingName === img.name}
                      className="p-1.5 bg-white/90 rounded-lg text-red-600 hover:bg-white transition-colors disabled:opacity-50"
                      title="Supprimer"
                    >
                      {deletingName === img.name ? (
                        <Loader className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="px-2 py-1.5">
                  <p className="text-xs text-slate-500 truncate">{img.name}</p>
                  {img.size > 0 && (
                    <p className="text-xs text-slate-400">{formatSize(img.size)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!isModal) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {content}
      </div>
    </div>
  );
}
