import { Product } from '../types';

export const generateStandaloneHtml = (products: Product[], supabaseUrl = '', supabaseAnonKey = ''): string => {
  const productsJson = JSON.stringify(products, null, 2);

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>أَرْز للأخشاب | متجر التحف والمنتجات الخشبية اليدوية</title>
  <meta name="description" content="متجر للمنتجات الخشبية البسيطة والراقية: براويز، ساعات حائط، تحف، طرابيزات صغيرة وكراسي.">
  
  <!-- خطوط جوجل العربية الفاخرة -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS عبر CDN لتشغيل الصفحة كملف واحد على GitHub Pages بدون أي Build -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Cairo', 'sans-serif'],
          },
          colors: {
            brand: {
              cream: '#faf8f5',
              dark: '#292524',
              accent: '#b48454',
              accentHover: '#986a3d',
              card: '#ffffff',
              border: '#f0e9df',
              muted: '#78716c'
            }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Cairo', sans-serif; background-color: #faf8f5; color: #292524; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">

  <!-- شريط المزايا العلوي -->
  <div class="bg-[#292524] text-[#e7e5e4] text-xs py-2 px-4 text-center border-b border-[#3e3835]">
    <span>أخشاب طبيعية 100% · صُنع يدوي متقن · شحن متاح لجميع المحافظات</span>
  </div>

  <!-- الهيدر الرئيسي (Top Bar Contract: 3 zones) -->
  <header class="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ebdccd]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
      <!-- Zone 1: اسم المتجر -->
      <a href="#" class="text-2xl font-bold tracking-tight text-[#292524] whitespace-nowrap shrink-0">
        أَرْز للأخشاب
      </a>

      <!-- Zone 2: روابط التنقل -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534e]">
        <a href="#products-section" class="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">المعروضات الخشبية</a>
        <a href="#craft-story" class="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">قصة الحرفة</a>
        <a href="#github-supabase-info" class="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0">ربط Supabase</a>
      </nav>

      <!-- Zone 3: زر السلة الفوري -->
      <div class="flex items-center gap-3 shrink-0">
        <button onclick="toggleCart()" class="relative px-4 py-2.5 text-xs font-semibold text-white bg-[#292524] rounded-lg hover:bg-[#1c1917] transition-all flex items-center gap-2 shadow-sm">
          <span>سلة المشتريات</span>
          <span id="cart-badge" class="bg-[#b48454] text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- الواجهة الرئيسية (Hero Section) -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <p class="text-xs font-semibold text-[#b48454] mb-3">حِرفة خشبية يدوية أصيلة</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292524] leading-tight mb-6" style="text-wrap: balance;">
          قطع خشبية دافئة تُعطي منزلك روح الطبيعة والبساطة
        </h1>
        <p class="text-base sm:text-lg text-[#57534e] mb-8 leading-relaxed max-w-xl">
          براويز أنيقة، ساعات حائط مينيمال صامتة، تحف انسيابية، وطرابيزات وكراسي صغيرة مصنوعة يدوياً من خشب البلوط، الزان، والجوز المعالج بعناية فائقة.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#products-section" class="px-6 py-3.5 bg-[#b48454] hover:bg-[#986a3d] text-white font-medium text-sm rounded-lg transition-colors shadow-sm">
            تصفح المنتجات والأسعار
          </a>
          <button onclick="openWhatsAppInquiry('استفسار عام عن منتجات الأخشاب')" class="px-5 py-3.5 border border-[#d6c7b2] hover:bg-[#f3ebe1] text-[#292524] font-medium text-sm rounded-lg transition-colors flex items-center gap-2">
            <span>تواصل مباشرة عبر واتساب</span>
          </button>
        </div>
      </div>

      <div class="relative rounded-2xl overflow-hidden border border-[#e8dfd5] shadow-lg bg-[#f0e9df] aspect-[4/3]">
        <img id="hero-img" src="" alt="تحف خشبية يدوية" class="w-full h-full object-cover">
      </div>
    </div>
  </section>

  <!-- شريط الميزات والضمانات -->
  <section class="bg-white border-y border-[#ebdccd] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
      <div class="p-4">
        <h3 class="font-bold text-base text-[#292524] mb-1">أخشاب مصمتة 100%</h3>
        <p class="text-xs text-[#78716c]">لا نستخدم MDF أو النشارة المضغوطة، فقط خشب صلب حقيقي معالج طبيعياً.</p>
      </div>
      <div class="p-4 border-y md:border-y-0 md:border-x border-[#f0e9df]">
        <h3 class="font-bold text-base text-[#292524] mb-1">أسعار واضحة ومحدثة</h3>
        <p class="text-xs text-[#78716c]">الأسعار معلنة بشفافية مع توفر الربط مع Supabase لتحديثها بسهولة.</p>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-base text-[#292524] mb-1">طلب فوري بدون تعقيد</h3>
        <p class="text-xs text-[#78716c]">لا حاجة لتسجيل حساب؛ أضف للسلة واطلب بنقرة زر عبر واتساب فوراً.</p>
      </div>
    </div>
  </section>

  <!-- قسم المعروضات والتسوق -->
  <main id="products-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1 w-full">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#292524]">المعروضات الخشبية</h2>
        <p class="text-sm text-[#78716c] mt-1">اختر من بين مجموعتنا المتنوعة المصنوعة يدوياً بحب وإتقان</p>
      </div>

      <!-- محرك البحث -->
      <div class="w-full md:w-72">
        <input 
          type="text" 
          id="search-input" 
          oninput="renderProducts()" 
          placeholder="ابحث عن برواز، ساعة، طرابيزة..." 
          class="w-full px-4 py-2 text-sm bg-white border border-[#d6c7b2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b48454]"
        >
      </div>
    </div>

    <!-- فلاتر الفئات (Buttons/Segmented controls) -->
    <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
      <button onclick="setCategory('all')" class="cat-btn px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap bg-[#292524] text-white" data-cat="all">الكل (جميع المنتجات)</button>
      <button onclick="setCategory('frames')" class="cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]" data-cat="frames">براويز خشبية</button>
      <button onclick="setCategory('clocks')" class="cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]" data-cat="clocks">ساعات حائط</button>
      <button onclick="setCategory('antiques')" class="cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]" data-cat="antiques">تحف وأنتيكات</button>
      <button onclick="setCategory('tables')" class="cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]" data-cat="tables">طرابيزات صغيرة</button>
      <button onclick="setCategory('chairs')" class="cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]" data-cat="chairs">كراسي واستولات</button>
    </div>

    <!-- شبكة المنتجات -->
    <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- يتم حقن المنتجات تلقائياً عبر الجافاسكربت -->
    </div>
  </main>

  <!-- درج سلة المشتريات (Cart Drawer) -->
  <div id="cart-drawer" class="fixed inset-0 z-50 overflow-hidden hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" onclick="toggleCart()"></div>
    <div class="fixed inset-y-0 left-0 max-w-full flex pl-0">
      <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
        <div class="p-6 border-b border-[#f0e9df] flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#292524]">سلة الطلبات الخاصة بك</h2>
          <button onclick="toggleCart()" class="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        <div id="cart-items" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- عناصر السلة -->
        </div>

        <div class="p-6 border-t border-[#f0e9df] bg-[#faf8f5] space-y-4">
          <div class="flex items-center justify-between font-bold text-base">
            <span>الإجمالي التقريبي:</span>
            <span id="cart-total" class="text-xl text-[#b48454] tabular-nums">0 ج.م</span>
          </div>

          <button onclick="checkoutWhatsApp()" class="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span>تأكيد وإرسال الطلب عبر واتساب</span>
          </button>
          <button onclick="clearCart()" class="w-full py-2 text-xs text-stone-500 hover:text-stone-800 transition-colors">
            إفراغ السلة
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- نافذة تفاصيل المنتج (Product Modal) -->
  <div id="product-modal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-stone-900/60 transition-opacity" onclick="closeProductModal()"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-[#e8dfd5]">
        <div id="product-modal-content" class="p-6">
          <!-- تفاصيل المنتج بالكامل -->
        </div>
      </div>
    </div>
  </div>

  <!-- قسم معلومات الربط مع GitHub و Supabase -->
  <section id="github-supabase-info" class="bg-[#f5efe6] border-t border-[#ebdccd] py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-xl p-8 border border-[#e8dfd5] shadow-xs">
        <h3 class="text-xl font-bold text-[#292524] mb-3">دليل نشر الصفحة على GitHub Pages وربط Supabase</h3>
        <p class="text-sm text-[#57534e] mb-6 leading-relaxed">
          هذا الملف عبارة عن صفحة HTML متكاملة مستقلة واحدة (Single Page). لنشرها على جيت هاب ولربط الأسعار بسوبابيز:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#57534e]">
          <div class="bg-[#faf8f5] p-5 rounded-lg border border-[#f0e9df]">
            <h4 class="font-bold text-[#292524] text-sm mb-2">1. نشر الصفحة على GitHub Pages</h4>
            <ol class="list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>أنشئ مستودع جديد على GitHub (New Repository).</li>
              <li>احفظ هذا الكود باسم <code class="bg-[#f0e9df] px-1 py-0.5 rounded">index.html</code> وارفعه للمستودع.</li>
              <li>اذهب إلى <b>Settings</b> ثم <b>Pages</b> واختر فرع <b>main</b> واضغط حفظ.</li>
              <li>سيصبح موقعك متاحاً مجاناً للجميع حول العالم فوراً!</li>
            </ol>
          </div>
          <div class="bg-[#faf8f5] p-5 rounded-lg border border-[#f0e9df]">
            <h4 class="font-bold text-[#292524] text-sm mb-2">2. ربط تحديث الأسعار مع Supabase</h4>
            <ol class="list-decimal list-inside space-y-1.5 leading-relaxed">
              <li>أنشئ مشروع مجاني في Supabase وأنشئ جدولاً باسم <code class="bg-[#f0e9df] px-1 py-0.5 rounded">products</code>.</li>
              <li>أضف أعمدة: <code class="bg-[#f0e9df] px-1 py-0.5 rounded">id</code>, <code class="bg-[#f0e9df] px-1 py-0.5 rounded">price</code>, <code class="bg-[#f0e9df] px-1 py-0.5 rounded">name_ar</code>.</li>
              <li>ضع مفتاح الـ URL والـ Anon Key في كود الجافاسكربت أسفل الصفحة.</li>
              <li>أي تعديل في أسعار جدول Supabase ينعكس فوراً لدى الزوار بدون إعادة رفع الكود!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- الفوتر البسيط -->
  <footer class="bg-[#292524] text-[#a8a29e] py-8 text-center text-xs">
    <div class="max-w-7xl mx-auto px-4">
      <p class="font-semibold text-white mb-2">أَرْز للأخشاب والتحف اليدوية</p>
      <p>© 2026 جميع الحقوق محفوظة · صُنع بحرفية وشغف</p>
    </div>
  </footer>

  <!-- جافاسكربت الصفحة الكامل للتحكم بالمنتجات والسلة والواتساب وسوبابيز -->
  <script>
    // بيانات المنتجات الافتراضية
    let PRODUCTS = ${productsJson};

    // إعدادات سوبابيز (يمكنك وضع الرابط والمفتاح هنا لتحديث الأسعار تلقائياً)
    const SUPABASE_CONFIG = {
      url: "${supabaseUrl}",
      anonKey: "${supabaseAnonKey}",
      tableName: "products"
    };

    // رقم هاتف الواتساب لاستقبال الطلبات (عدل هذا الرقم لرقمك الخاص)
    const WHATSAPP_PHONE = "201000000000";

    let currentCategory = 'all';
    let cart = [];

    // جلب الأسعار المحدثة من سوبابيز إن وجدت
    async function syncPricesFromSupabase() {
      if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) return;
      try {
        const response = await fetch(\`\${SUPABASE_CONFIG.url}/rest/v1/\${SUPABASE_CONFIG.tableName}?select=*\`, {
          headers: {
            apikey: SUPABASE_CONFIG.anonKey,
            Authorization: \`Bearer \${SUPABASE_CONFIG.anonKey}\`
          }
        });
        if (response.ok) {
          const remoteData = await response.json();
          if (Array.isArray(remoteData)) {
            remoteData.forEach(item => {
              const localProd = PRODUCTS.find(p => p.id === item.id || p.nameAr === item.name_ar);
              if (localProd && item.price) {
                localProd.price = Number(item.price);
              }
            });
            renderProducts();
          }
        }
      } catch (err) {
        console.log("Supabase sync note: Continuing with default catalog", err);
      }
    }

    function setCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.className = "cat-btn px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap bg-[#292524] text-white";
        } else {
          btn.className = "cat-btn px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]";
        }
      });
      renderProducts();
    }

    function renderProducts() {
      const grid = document.getElementById('products-grid');
      const search = (document.getElementById('search-input').value || '').trim().toLowerCase();

      const filtered = PRODUCTS.filter(p => {
        const matchCategory = (currentCategory === 'all' || p.category === currentCategory);
        const matchSearch = !search || p.nameAr.toLowerCase().includes(search) || p.woodTypeAr.toLowerCase().includes(search);
        return matchCategory && matchSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = \`
          <div class="col-span-full py-16 text-center text-[#78716c]">
            <p class="text-base font-semibold">لم نجد أي منتجات تطابق بحثك حالياً.</p>
            <button onclick="setCategory('all'); document.getElementById('search-input').value='';" class="mt-3 text-xs text-[#b48454] underline">عرض كافة المنتجات</button>
          </div>
        \`;
        return;
      }

      grid.innerHTML = filtered.map(p => \`
        <div class="bg-white rounded-xl border border-[#ebdccd] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
          <div class="relative aspect-[4/3] bg-[#f5efe6] overflow-hidden cursor-pointer" onclick="openProductModal('\${p.id}')">
            <img src="\${p.image}" alt="\${p.nameAr}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80'">
          </div>
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-xs text-[#b48454] font-medium mb-1">\${p.categoryNameAr}</p>
              <h3 class="font-bold text-base text-[#292524] mb-2 cursor-pointer hover:text-[#b48454]" onclick="openProductModal('\${p.id}')">\${p.nameAr}</h3>
              <p class="text-xs text-[#78716c] mb-4 line-clamp-2">\${p.descriptionAr}</p>
              
              <div class="text-xs text-[#78716c] space-y-1 mb-4 pt-2 border-t border-[#f5efe6]">
                <div>نوع الخشب: <span class="font-medium text-[#292524]">\${p.woodTypeAr}</span></div>
                <div>المقاس: <span class="font-medium text-[#292524]">\${p.dimensionsAr}</span></div>
              </div>
            </div>

            <div class="pt-3 border-t border-[#ebdccd] flex items-center justify-between">
              <div>
                <span class="text-lg font-bold text-[#292524] tabular-nums">\${p.price} ج.م</span>
                \${p.originalPrice ? \`<span class="text-xs text-[#a8a29e] line-through mr-2 tabular-nums">\${p.originalPrice} ج.م</span>\` : ''}
              </div>
              <div class="flex items-center gap-2">
                <button onclick="openProductModal('\${p.id}')" class="px-2.5 py-1.5 text-xs text-[#57534e] hover:text-[#292524] border border-[#e8dfd5] rounded-lg">التفاصيل</button>
                <button onclick="addToCart('\${p.id}')" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#292524] hover:bg-[#b48454] rounded-lg transition-colors">أضف للسلة</button>
              </div>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function openProductModal(id) {
      const p = PRODUCTS.find(item => item.id === id);
      if (!p) return;
      const modal = document.getElementById('product-modal');
      const content = document.getElementById('product-modal-content');

      content.innerHTML = \`
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-xs text-[#b48454] font-bold">\${p.categoryNameAr}</span>
            <h2 class="text-xl font-bold text-[#292524] mt-1">\${p.nameAr}</h2>
          </div>
          <button onclick="closeProductModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold">✕</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div class="aspect-[4/3] rounded-lg overflow-hidden bg-[#f5efe6]">
            <img src="\${p.image}" alt="\${p.nameAr}" class="w-full h-full object-cover">
          </div>
          <div class="space-y-3 text-xs text-[#57534e]">
            <p class="text-sm leading-relaxed text-[#292524]">\${p.descriptionAr}</p>
            <div class="bg-[#faf8f5] p-3 rounded-lg border border-[#ebdccd] space-y-1.5">
              <div><b>نوع الخشب:</b> \${p.woodTypeAr}</div>
              <div><b>الأبعاد:</b> \${p.dimensionsAr}</div>
              <div><b>نوع التشطيب:</b> \${p.finishAr}</div>
              <div><b>مدة التجهيز والشحن:</b> \${p.leadTimeAr}</div>
            </div>
            <div class="pt-2">
              <span class="text-2xl font-bold text-[#292524] tabular-nums">\${p.price} ج.م</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-[#f0e9df]">
          <button onclick="addToCart('\${p.id}'); closeProductModal(); toggleCart();" class="flex-1 py-3 bg-[#292524] hover:bg-[#b48454] text-white text-xs font-bold rounded-lg transition-colors">
            إضافة إلى السلة
          </button>
          <button onclick="openWhatsAppInquiry('طلب مباشر: ' + '\${p.nameAr}' + ' بسعر ' + '\${p.price}' + ' ج.م')" class="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
            طلب فوري عبر واتساب
          </button>
        </div>
      \`;

      modal.classList.remove('hidden');
    }

    function closeProductModal() {
      document.getElementById('product-modal').classList.add('hidden');
    }

    function toggleCart() {
      const drawer = document.getElementById('cart-drawer');
      drawer.classList.toggle('hidden');
      renderCart();
    }

    function addToCart(id) {
      const existing = cart.find(item => item.product.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        const prod = PRODUCTS.find(p => p.id === id);
        if (prod) cart.push({ product: prod, quantity: 1 });
      }
      updateCartBadge();
    }

    function updateCartBadge() {
      const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      document.getElementById('cart-badge').textContent = totalCount;
    }

    function changeQuantity(id, delta) {
      const index = cart.findIndex(item => item.product.id === id);
      if (index === -1) return;
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      updateCartBadge();
      renderCart();
    }

    function clearCart() {
      cart = [];
      updateCartBadge();
      renderCart();
    }

    function renderCart() {
      const container = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');

      if (cart.length === 0) {
        container.innerHTML = \`
          <div class="py-12 text-center text-[#78716c]">
            <p class="text-sm">السلة فارغة حالياً.</p>
            <p class="text-xs mt-1">تصفح المنتجات واضغط "أضف للسلة" لطلبها.</p>
          </div>
        \`;
        totalEl.textContent = "0 ج.م";
        return;
      }

      let total = 0;
      container.innerHTML = cart.map(item => {
        const subtotal = item.product.price * item.quantity;
        total += subtotal;
        return \`
          <div class="flex items-center gap-4 py-3 border-b border-[#f0e9df]">
            <img src="\${item.product.image}" alt="\${item.product.nameAr}" class="w-16 h-16 rounded object-cover bg-stone-100">
            <div class="flex-1">
              <h4 class="font-bold text-xs text-[#292524]">\${item.product.nameAr}</h4>
              <p class="text-xs text-[#78716c] tabular-nums">\${item.product.price} ج.م</p>
              <div class="flex items-center gap-2 mt-2">
                <button onclick="changeQuantity('\${item.product.id}', -1)" class="w-6 h-6 rounded bg-[#f0e9df] text-xs font-bold">-</button>
                <span class="text-xs font-mono font-bold tabular-nums">\${item.quantity}</span>
                <button onclick="changeQuantity('\${item.product.id}', 1)" class="w-6 h-6 rounded bg-[#f0e9df] text-xs font-bold">+</button>
              </div>
            </div>
            <div class="text-left">
              <span class="font-bold text-xs text-[#b48454] tabular-nums">\${subtotal} ج.م</span>
            </div>
          </div>
        \`;
      }).join('');

      totalEl.textContent = \`\${total} ج.م\`;
    }

    function checkoutWhatsApp() {
      if (cart.length === 0) {
        alert("سلة الطلبات فارغة، الرجاء إضافة منتج أولاً");
        return;
      }

      let message = "مرحباً، أود تأكيد طلب المنتجات الخشبية التالية من المتجر:\\n";
      let total = 0;
      cart.forEach((item, idx) => {
        const sub = item.product.price * item.quantity;
        total += sub;
        message += \`\${idx + 1}. \${item.product.nameAr} × \${item.quantity} = \${sub} ج.م\\n\`;
      });
      message += \`\\nالإجمالي: \${total} ج.م\\nبرجاء تأكيد التوفر وموعد الشحن.\`;

      openWhatsAppInquiry(message);
    }

    function openWhatsAppInquiry(text) {
      const url = \`https://wa.me/\${WHATSAPP_PHONE}?text=\${encodeURIComponent(text)}\`;
      window.open(url, '_blank');
    }

    // التهيئة عند تشغيل الصفحة
    window.addEventListener('DOMContentLoaded', () => {
      // تعيين أول صورة للهيرو
      if (PRODUCTS.length > 0) {
        document.getElementById('hero-img').src = PRODUCTS[2].image;
      }
      renderProducts();
      syncPricesFromSupabase();
    });
  </script>
</body>
</html>`;
};
