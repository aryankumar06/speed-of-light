export default function UploadZone({ onFile }) {
  return <label className="card border-dashed p-6 block text-center cursor-pointer">
    <p className="font-medium">Drag & drop file or tap to upload</p>
    <p className="text-sm text-slate-500">PDF / Word / Image</p>
    <input type="file" className="hidden" accept=".pdf,.doc,.docx,image/*" capture="environment" onChange={(e) => onFile(e.target.files?.[0])} />
  </label>;
}
