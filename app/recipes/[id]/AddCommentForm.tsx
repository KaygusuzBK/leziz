"use client";
import { useState } from "react";
import { addComment } from "../../lib/supabase/queries";
import { useUserStore } from "../../lib/store";

export default function AddCommentForm({ recipeId, onCommentAdded }: { recipeId: string, onCommentAdded?: () => void }) {
  const user = useUserStore((state) => state.user);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return <div className="text-gray-500">Yorum yapmak için giriş yapmalısınız.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    const { error } = await addComment(recipeId, user.id, content.trim());
    setLoading(false);
    if (error) {
      setError("Yorum eklenirken bir hata oluştu.");
    } else {
      setContent("");
      onCommentAdded?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        className="border rounded-lg p-2 resize-none min-h-[60px]"
        placeholder="Yorumunuzu yazın..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
        maxLength={500}
        required
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
        disabled={loading || !content.trim()}
      >
        {loading ? "Gönderiliyor..." : "Yorumu Gönder"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
} 