"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  /**
   * Dosya seçildiğinde Cloudinary’ye yükleme işlemini başlatır.
   * Cloudinary için gerekli FormData oluşturulur ve axios ile POST isteği atılır.
   * onUploadProgress sayesinde yükleme yüzdesi hesaplanıp gösterilir.
   */
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];
    setIsLoading(true);

    // Dosya adında boşlukları ve özel karakterleri temizliyoruz
    const sanitizedFileName = file.name
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");

    // Cloudinary'ye yüklemek için FormData oluşturuyoruz
    const formData = new FormData();
    formData.append("file", file);
    // İsteğe bağlı: Dosyanın Cloudinary üzerinde hangi isimle saklanacağını belirleyebilirsiniz.
    formData.append("public_id", `JobCoverImage/${Date.now()}-${sanitizedFileName}`);

    // Cloudinary konfigürasyon değerlerini .env üzerinden alıyoruz
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
      toast.error("Cloudinary konfigürasyonu eksik!");
      setIsLoading(false);
      return;
    }

    // İsteğin unsigned upload olması için upload_preset ekleniyor
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post<{ secure_url: string }>(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Yükleme sırasında progress takibi
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const progressPercentage =
              (progressEvent.loaded / (progressEvent.total || 1)) * 100;
            setProgress(progressPercentage);
          },
        } as any
      );

      const downloadURL = response.data.secure_url;
      onChange(downloadURL);
      toast.success("Resim yüklendi!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.message || "Yükleme sırasında bir hata oluştu."
      );
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full h-60 aspect-video relative rounded-md flex items-center justify-center overflow-hidden border border-dashed bg-neutral-50">
      {isLoading ? (
        // Yükleme sırasında yüzde bilgisini gösteriyoruz
        <p>{`${progress.toFixed(2)}%`}</p>
      ) : (
        <>
          {value ? (
            // Resim yüklendiyse önizleme gösterimi ve kaldırma butonu
            <div className="relative w-full h-full">
              <Image
                src={value}
                alt="Yüklenen Resim"
                fill
                className="object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                onClick={() => onRemove(value)}
              >
                {/* İkon ya da "X" metni kullanılabilir */}
                X
              </button>
            </div>
          ) : (
            // Resim seçilmemişse yükleme alanı
            <label className="w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer text-neutral-500">
              <ImagePlus className="w-10 h-10" />
              <p>Resim yüklemek için tıklayın</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
                disabled={disabled}
              />
            </label>
          )}
        </>
      )}
    </div>
  );
};
