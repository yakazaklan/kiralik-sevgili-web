import { redirect } from "next/navigation";

export default function AlanyaRedirectPage() {
  // Eski tekil /alanya SEO sayfasını, tam yapısal hiyerarşiye uygun olan /antalya/alanya sayfasına 301 kalıcı yönlendiriyoruz.
  // Bu sayede duplicate içerik oluşması önlenir ve arama motoru sıralamaları korunur.
  redirect("/antalya/alanya");
}
