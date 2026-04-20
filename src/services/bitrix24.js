// src/services/bitrix24.js
const WEBHOOK_URL = import.meta.env.VITE_BITRIX24_WEBHOOK_URL;

export const createBitrix24Deal = async (plantData) => {
  if (!WEBHOOK_URL) {
    console.warn('Битрикс24 вебхук не настроен. Интеграция пропущена.');
    return null;
  }

  const dealFields = {
    'TITLE': plantData.name,
    'UF_CRM_1776672675': plantData.name,               // Название растения
    'UF_CRM_1776672691': plantData.variety || '',      // Сорт
    'UF_CRM_1776672704': plantData.planting_date || null, // Дата посадки
    'UF_CRM_1776672738': plantData.notes || '',        // Заметки
    'UF_CRM_1776672762': plantData.is_active ? 'Y' : 'N', // Активно? (Y/N)
    'UF_CRM_1776672773': plantData.user_id,            // ID пользователя
    'UF_CRM_1776672788': plantData.created_at || new Date().toISOString(), // Дата создания
  };

  // Удаляем поля с пустыми значениями
  Object.keys(dealFields).forEach(key => {
    if (dealFields[key] === undefined || dealFields[key] === null || dealFields[key] === '') {
      delete dealFields[key];
    }
  });

  try {
    const response = await fetch(`${WEBHOOK_URL}crm.deal.add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: dealFields }),
    });
    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(`Ошибка API Битрикс24: ${result.error_description || response.statusText}`);
    }
    console.log('Сделка в Битрикс24 создана, ID:', result.result);
    return result;
  } catch (error) {
    console.error('Не удалось отправить данные в Битрикс24:', error);
    return null;
  }
};