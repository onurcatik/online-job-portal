"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface JobPublishActionProps {
  disabled?: boolean;
  jobId: string;
  isPublished: boolean;
}

export const JobPublishAction = ({
  disabled,
  jobId,
  isPublished,
}: JobPublishActionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePublishToggle = async () => {
    try {
      setIsLoading(true);
      // İşin yayınlanma durumunu değiştiren API isteği:
      // Eğer iş yayınlandıysa "unpublish" (DELETE), yayınlanmamışsa "publish" (POST) işlemi yapılır.
      const response = await fetch(`/api/job/${jobId}/publish`, {
        method: isPublished ? "DELETE" : "POST",
      });

      if (!response.ok) {
        throw new Error("Yayınlama işlemi sırasında bir hata oluştu.");
      }

      // İşlem başarılı ise UI güncellenebilir veya kullanıcıya bildirim gösterilebilir.
    } catch (error) {
      console.error(error);
      // Hata durumunda kullanıcıya bildirim verilebilir.
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      // İşin silinmesi için API isteği:
      const response = await fetch(`/api/job/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Silme işlemi sırasında bir hata oluştu.");
      }

      // İşlem başarılı ise UI güncellenebilir veya kullanıcı yönlendirilebilir.
    } catch (error) {
      console.error(error);
      // Hata durumunda kullanıcıya bildirim verilebilir.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Button
        variant="outline"
        onClick={handlePublishToggle} // Action parametresi olarak tıklama işlemi tanımlandı.
        disabled={disabled || isLoading} // disabled durumu; dışarıdan gelen disabled veya isLoading true ise aktif.
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button
        variant="destructive"
        size="icon"
        disabled={isLoading} // Sadece isLoading kontrol ediliyor.
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
