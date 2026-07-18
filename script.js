// =========================================
// S.W.A.T TEAM
// script.js
// =========================================

// رابط Webhook
const WEBHOOK_URL = "https://discord.com/api/webhooks/1528013840074412074/7V5usnVIQ53adJ2wQsJC3PtWoWlBavMkvlbKjA6_gB2jUQjiDkW2dvou6v6z0raMTSaz";

// ===============================
// الإشعار
// ===============================

function showNotification(title, message) {

    const notification = document.getElementById("notification");

    if (!notification) return;

    notification.querySelector("h3").textContent = title;
    notification.querySelector("p").textContent = message;

    notification.classList.remove("hide");
    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");
        notification.classList.add("hide");

    }, 3000);

}

// ===============================
// نموذج التواصل
// ===============================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const details = document.getElementById("details").value.trim();

        if (!name || !phone || !details) {

            showNotification("خطأ", "يرجى تعبئة جميع الحقول.");

            return;

        }

        const payload = {

            embeds: [

                {

                    title: "📥 طلب تواصل جديد",

                    color: 3447003,

                    fields: [

                        {
                            name: "👤 الاسم",
                            value: name,
                            inline: false
                        },

                        {
                            name: "📱 رقم الجوال",
                            value: phone,
                            inline: false
                        },

                        {
                            name: "📝 التفاصيل",
                            value: details,
                            inline: false
                        }

                    ],

                    timestamp: new Date().toISOString()

                }

            ]

        };

        try {

            const response = await fetch(WEBHOOK_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)

            });

            if (response.ok || response.status === 204) {

                showNotification(
                    "تم الإرسال",
                    "تم إرسال طلبك بنجاح."
                );

                form.reset();

            } else {

                showNotification(
                    "فشل الإرسال",
                    "تعذر إرسال الطلب."
                );

            }

        } catch (error) {

            console.error(error);

            showNotification(
                "خطأ",
                "حدث خطأ أثناء الاتصال."
            );

        }

    });

}

// ===============================
// التنقل السلس
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===============================
// تغيير الهيدر عند النزول
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.background = "rgba(5,11,22,.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(8,15,30,.55)";
        header.style.boxShadow = "none";

    }

});

// ===============================
// ظهور الأقسام
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.7s";

    observer.observe(section);

});

// ===============================
// رسالة التشغيل
// ===============================

console.log("S.W.A.T TEAM Website Loaded");