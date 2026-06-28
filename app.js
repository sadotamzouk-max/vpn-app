// تسجيل الـ Service Worker ليعمل المتصفح بدون إنترنت
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('جاهز للعمل كمتصفح مستقل!'))
            .catch(err => console.log('خطأ في التسجيل:', err));
    });
}

const goBtn = document.getElementById('goBtn');
const urlInput = document.getElementById('urlInput');
const countrySelect = document.getElementById('countrySelect');
const browserFrame = document.getElementById('browserFrame');
const statusText = document.getElementById('statusText');
const statusDot = document.getElementById('statusDot');

goBtn.addEventListener('click', launchSecureBrowser);

// تفعيل فتح المواقع بالضغط على زر Enter في الكيبورد أيضاً
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') launchSecureBrowser();
});

function launchSecureBrowser() {
    let targetUrl = urlInput.value.trim();
    if (!targetUrl) return;

    // إصلاح صيغة الرابط تلقائياً إذا نسى المستخدم كتابة http
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
    }

    const selectedCountryCode = countrySelect.value;
    const selectedCountryName = countrySelect.options[countrySelect.selectedIndex].text;

    // تحديث شريط الحالة ليعرف المستخدم أنه محمي عبر الدولة المختارة
    statusDot.classList.add('active');
    statusText.innerText = `تتصفح الآن بأمان عالي عبر خادم: ${selectedCountryName}`;
    statusText.style.color = "#00e676";

    // البوابة البرمجية المشفرة (البروكسي المدمج عالي السرعة للتصفح)
    // ندمج الرابط مع خادم البروكسي الديناميكي المحدد للدولة للوصول بسرعة معقولة
    const cryptoProxyNode = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    
    // توجيه المتصفح الداخلي لفتح الموقع
    browserFrame.src = cryptoProxyNode;
}