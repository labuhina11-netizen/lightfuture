export default function handler(req, res) {
  const botToken = '8330969273:AAHo1jOtALp70Y-Vpc1vDjVG3TrjrAnGo7E';
  const chatId = '-1003984373705';
  
  // 1. Определяем домен, с которого зашел юзер
  const host = req.headers.host; 
  
  // 2. Формируем текст уведомления в зависимости от домена
  const text = encodeURIComponent(`🚀 Клик по ссылке в био на домене: ${host}`);

  // 3. Отправляем уведомление в Telegram
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
    .catch(err => console.error("Ошибка ТГ:", err));

  // 4. УМНЫЙ РЕДИРЕКТ
  // Пользователь останется на том же домене, где нажал кнопку, 
  // но попадет на главную страницу (где лежит твой index.html)
  res.setHeader('Location', `https://${host}/`);
  res.status(302).end();
}