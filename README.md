# Marmara Kodlama – Kayıp Eşya Platformu

Marmara Üniversitesi öğrencilerinin **kaybettikleri eşyaları bulmalarına** yardımcı olmak için geliştirilmiş bir web uygulaması.

- Öğrenciler **kayıp/bulunan eşya** ilanı açabilir.
- İletişim **yalnızca okul e-postası** üzerinden sağlanır.
- Sisteme **yalnızca Marmara Üniversitesi öğrencileri** (öğrenciliğini kanıtlayan) erişebilir.
- Amaç, **yardımlaşmayı artırmak** ve eşyaların sahibine dönmesini kolaylaştırmak.

---

## Özellikler
- Yalnızca Marmara Üniversitesi öğrencileri kayıt/giriş yapabilir.
-  Kayıp veya bulunan eşyalar için ilan açma/düzenleme.
-  Eşyaları kategori, tarih vb. ile listeleme.
-  okul e-postası üzerinden iletişim kurulan yardımlaşmayı artıran bir platform.

---

## Teknolojiler
- **Backend**: PHP **Laravel**
- **Frontend**: **React**
- **Database**: **Microsoft SQL Server**

---

## Branch ve Proje Yapısı

> **Önemli:** Bu repodaki **ana branch (`main`) boştur**. Uygulama kodlarına erişmek için branch değiştirin.

- `backend` → Laravel API (PHP)
- `frontend` → React arayüzü

### GitHub arayüzünden branch değiştirme
1. Repo sayfasında **Branch** açılır menüsüne tıklayın.
2. `backend` veya `frontend` branch’ini seçin.
3. İlgili klasör/kod bu branch’te görüntülenecektir.

### Git ile branch değiştirme
```bash
# Depoyu klonlayın
git clone https://github.com/muratcankargi/marmara-kodlama.git
cd marmara-kodlama

# Backend koduna geçiş
git switch backend   # Eski Git sürümleri için: git checkout backend

# Frontend koduna geçiş
git switch frontend  # Eski Git sürümleri için: git checkout frontend
