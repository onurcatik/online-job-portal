"use client"

// utils/convertOverview.ts
import { Descendant, Node } from "slate";

export function parseOverview(overview: string | null): Descendant[] {
  if (!overview) {
    return [{ type: "paragraph", children: [{ text: "" }] }];
  }
  try {
    const parsed = JSON.parse(overview);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // JSON parse hatası
  }
  return [{ type: "paragraph", children: [{ text: overview }] }];
}

// slateToText fonksiyonunu ekleyin ve ihraç edin:
export function slateToText(value: Descendant[]): string {
  // Node.string, bir Slate node’unun içindeki text’i döndürür.
  // Eğer bir array’i tüm satırlara dönüştürmek isterseniz, map + join kullanabilirsiniz.
  return value.map((node) => Node.string(node)).join("\n");
}
